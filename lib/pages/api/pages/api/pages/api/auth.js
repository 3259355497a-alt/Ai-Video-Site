import { createClient } from '@supabase/supabase-js';
import { grantTrialCredits } from '../../lib/credits';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // 查找用户
    let { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!user) {
      // 新用户，创建记录
      const { data: newUser } = await supabase
        .from('users')
        .insert({ email })
        .select()
        .single();
      
      // 送1次免费试用
      await grantTrialCredits(newUser.id);
      
      user = newUser;
    }

    // 获取最新积分
    const { data: credits } = await supabase
      .from('users')
      .select('credits, used_trial')
      .eq('id', user.id)
      .single();

    res.status(200).json({
      id: user.id,
      email: user.email,
      credits: credits.credits,
      usedTrial: credits.used_trial
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
