const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { prompt, type } = req.body;
  if (!prompt) return res.status(400).json({ error: 'الموضوع مطلوب' });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompts = {
      podcast: `أنت محرر بودكاست عربي محترف. اكتب سكريبت بودكاست احترافي عن: ${prompt}`,
      youtube: `أنت يوتيوبر عربي محترف. اكتب سكريبت يوتيوب جذاب عن: ${prompt}`,
      tiktok: `اكتب سكريبت تيك توك قصير وجذاب 30 ثانية عن: ${prompt}`,
      translate: `ترجم هذا النص للعربية الفصحى: ${prompt}`
    };

    const result = await model.generateContent(prompts[type] || prompts.podcast);
    const text = result.response.text();
    res.json({ result: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
