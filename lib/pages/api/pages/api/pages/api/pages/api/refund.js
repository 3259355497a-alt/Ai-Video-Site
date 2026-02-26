import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST' });
  }

  try {
    const { userId, orderId } = req.body;

    // 1. 获取用户信息
    const { data: user } = await supabase
      .from('users')
      .select('credits, email')
      .eq('id', userId)
      .single();

    // 2. 获取该订单的充值记录
    const { data: purchases } = await supabase
      .from('credit_transactions')
      .select('amount, created_at')
      .eq('order_id', orderId)
      .eq('type', 'purchase');

    if (!purchases || purchases.length === 0) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const purchasedCredits = purchases.reduce((sum, t) => sum + t.amount, 0);
    const purchaseDate = purchases[0].created_at;

    // 3. 获取该订单之后的消费记录
    const { data: usage } = await supabase
      .from('credit_transactions')
      .select('amount')
      .eq('user_id', userId)
      .eq('type', 'usage')
      .gte('created_at', purchaseDate);

    const usedCredits = Math.abs(usage.reduce((sum, t) => sum + t.amount, 0));
    
    // 4. 计算可退积分
    const refundableCredits = purchasedCredits - usedCredits;
    
    if (refundableCredits <= 0) {
      return res.status(400).json({ 
        error: 'No refundable credits',
        message: 'All credits from this order have been used'
      });
    }

    // 5. 获取订单金额
    const orderResponse = await fetch(`https://api.lemonsqueezy.com/v1/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_KEY}`
      }
    });
    
    if (!orderResponse.ok) {
      throw new Error('Failed to fetch order from Lemon Squeezy');
    }
    
    const orderData = await orderResponse.json();
    
    // 6. 计算退款金额
    const refundAmount = (refundableCredits / purchasedCredits) * orderData.data.attributes.total;

    // 7. 调用Lemon Squeezy退款
    const refundResponse = await fetch(`https://api.lemonsqueezy.com/v1/orders/${orderId}/refund`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: refundAmount,
        reason: 'Refund for unused credits'
      })
    });

    if (!refundResponse.ok) {
      throw new Error('Refund failed');
    }

    // 8. 扣除用户积分
    await supabase
      .from('users')
      .update({ credits: user.credits - refundableCredits })
      .eq('id', userId);

    // 9. 记录退款
    await supabase.from('credit_transactions').insert({
      user_id: userId,
      amount: -refundableCredits,
      type: 'refund',
      order_id: orderId,
      note: `Refunded ${refundableCredits} credits`
    });

    res.status(200).json({ 
      success: true,
      refundedCredits: refundableCredits,
      refundAmount: refundAmount
    });
    
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({ error: error.message });
  }
}
