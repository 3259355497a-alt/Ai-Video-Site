import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// 检查用户积分
export async function checkCredits(userId) {
  const { data } = await supabase
    .from('users')
    .select('credits, used_trial')
    .eq('id', userId)
    .single();
  return data;
}

// 扣除积分（预扣）
export async function deductCredit(userId) {
  const user = await checkCredits(userId);
  if (user.credits < 1) throw new Error('Insufficient credits');

  await supabase
    .from('users')
    .update({ credits: user.credits - 1 })
    .eq('id', userId);

  await supabase.from('credit_transactions').insert({
    user_id: userId,
    amount: -1,
    type: 'usage'
  });
}

// 返还积分（失败时用）
export async function refundCredit(userId, amount, reason) {
  const { data: user } = await supabase
    .from('users')
    .select('credits')
    .eq('id', userId)
    .single();

  await supabase
    .from('users')
    .update({ credits: user.credits + amount })
    .eq('id', userId);

  await supabase.from('credit_transactions').insert({
    user_id: userId,
    amount: amount,
    type: 'refund',
    note: reason
  });
}

// 新用户送1次免费试用
export async function grantTrialCredits(userId) {
  const { data: user } = await supabase
    .from('users')
    .select('used_trial')
    .eq('id', userId)
    .single();

  if (!user.used_trial) {
    await supabase
      .from('users')
      .update({ credits: 1, used_trial: true })
      .eq('id', userId);

    await supabase.from('credit_transactions').insert({
      user_id: userId,
      amount: 1,
      type: 'trial'
    });

    return 1;
  }
  return 0;
}
