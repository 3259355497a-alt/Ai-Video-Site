export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST' });
  }

  try {
    // 临时简化版，直接返回成功
    res.status(200).json({ 
      success: true,
      refundedCredits: 0,
      refundAmount: 0
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
