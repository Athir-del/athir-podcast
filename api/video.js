module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'الوصف مطلوب' });

  try {
    const response = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-11-06'
      },
      body: JSON.stringify({
        promptText: prompt,
        model: 'gen3a_turbo',
        duration: 10,
        ratio: '1280:768'
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    res.json({ id: data.id, status: 'processing' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
