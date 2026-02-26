import { checkCredits, deductCredit, refundCredit } from '../../lib/credits';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST' });
  }

  try {
    const { imageBase64, prompt, userId } = req.body;

    const user = await checkCredits(userId);
    if (user.credits < 1) {
      return res.status(402).json({ 
        error: 'Insufficient credits',
        credits: user.credits
      });
    }

    await deductCredit(userId);

    let videoUrl = null;
    let success = false;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    
    while (retryCount < MAX_RETRIES && !success) {
      try {
        const createResponse = await fetch('https://api.siliconflow.cn/v1/video/submit', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.SILICONFLOW_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'CogVideoX-5B',
            image: imageBase64,
            prompt: prompt || 'Make it move naturally',
            negative_prompt: '扭曲,变形,模糊'
          })
        });

        if (!createResponse.ok) {
          throw new Error(`API error: ${createResponse.status}`);
        }

        const createData = await createResponse.json();
        
        if (!createData.id) {
          throw new Error('Failed to create task');
        }

        for (let i = 0; i < 30; i++) {
          await new Promise(r => setTimeout(r, 3000));
          
          const queryResponse = await fetch(`https://api.siliconflow.cn/v1/video/${createData.id}`, {
            headers: {
              'Authorization': `Bearer ${process.env.SILICONFLOW_KEY}`
            }
          });
          
          const queryData = await queryResponse.json();
          
          if (queryData.status === 'succeeded') {
            videoUrl = queryData.video.url;
            success = true;
            break;
          } else if (queryData.status === 'failed') {
            throw new Error('Generation failed');
          }
        }
        
        break;
        
      } catch (error) {
        console.log(`Attempt ${retryCount + 1} failed:`, error.message);
        retryCount++;
        
        if (retryCount === MAX_RETRIES) {
          await refundCredit(userId, 1, 'API failed after retries');
          return res.status(500).json({ 
            error: 'Generation failed after retries',
            autoRefunded: true,
            message: 'Credits have been refunded'
          });
        }
        
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    if (success && videoUrl) {
      res.status(200).json({ 
        videoUrl, 
        success: true,
        creditsLeft: user.credits - 1
      });
    }
    
  } catch (error) {
    if (userId) {
      await refundCredit(userId, 1, 'Unexpected error');
    }
    res.status(500).json({ 
      error: error.message,
      autoRefunded: true
    });
  }
}
