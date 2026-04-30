module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'الوصف مطلوب' });

  try {
    const response = await fetch('https://api.replicate.com/v1/models/minimax/video-01/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          prompt: prompt,
          duration: 5
        }
      })
    });

    const prediction = await response.json();
    res.json({ id: prediction.id, status: prediction.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
