const VOICES = {
  'male-arabic': 'pNInz6obpgDQGcFmaJgB',
  'female-arabic': 'EXAVITQu4vr4xnSDxMaL',
  'youth-energetic': 'VR6AewLTigWG4xSOukaG',
  'professional': 'ErXwobaYiN019PkySvjV'
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { text, voice } = req.body;
  if (!text) return res.status(400).json({ error: 'النص مطلوب' });

  const voiceId = VOICES[voice] || VOICES['male-arabic'];

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text.substring(0, 500),
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(500).json({ error: JSON.stringify(err) });
    }

    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
