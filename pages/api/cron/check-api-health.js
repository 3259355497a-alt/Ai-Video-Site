export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const start = Date.now();
    const response = await fetch('https://api.siliconflow.cn/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.SILICONFLOW_KEY}`
      }
    });
    const latency = Date.now() - start;
    
    if (latency > 5000 || !response.ok) {
      console.log('API Health Check Failed');
    }
    
    res.status(200).json({ latency, status: response.status });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
