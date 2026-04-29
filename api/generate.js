const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { script } = req.body;
  if (!script) return res.status(400).json({ error: 'السكريبت مطلوب' });

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'أنت محرر بودكاست محترف. حسّن السكريبت باللغة العربية.' },
        { role: 'user', content: script }
      ],
      model: 'llama-3.3-70b-versatile',
    });

    res.json({ message: 'تم التوليد!', result: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
