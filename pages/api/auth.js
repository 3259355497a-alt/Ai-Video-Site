export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST' });
  }
  try {
    const { email } = req.body;
    res.status(200).json({
      id: 'temp-id-123',
      email: email || 'test@example.com',
      credits: 1,
      usedTrial: false
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
