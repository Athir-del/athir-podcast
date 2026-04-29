const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'النص مطلوب' });

  try {
    const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
    
    const audio = await client.textToSpeech.convert('pNInz6obpgDQGcFmaJgB', {
      text: text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 }
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    audio.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
