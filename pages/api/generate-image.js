export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST' });
  }
  try {
    const { imageBase64, prompt, userId } = req.body;
    res.status(200).json({ 
      videoUrl: 'https://example.com/sample-video.mp4',
      success: true,
      creditsLeft: 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
