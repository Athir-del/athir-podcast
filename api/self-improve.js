const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// قاعدة بيانات التحسينات
let improvements = [];
let stats = {
  totalGenerations: 0,
  popularTopics: {},
  popularStyles: {},
  userFeedback: [],
  lastImproved: new Date().toISOString()
};

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { action, data } = req.body;

    // تسجيل الإحصائيات
    if (action === 'track') {
      stats.totalGenerations++;
      if (data.topic) {
        stats.popularTopics[data.topic] = (stats.popularTopics[data.topic] || 0) + 1;
      }
      if (data.style) {
        stats.popularStyles[data.style] = (stats.popularStyles[data.style] || 0) + 1;
      }
      return res.json({ success: true, stats });
    }

    // تحليل وتحسين ذاتي
    if (action === 'analyze') {
      try {
        const topTopics = Object.entries(stats.popularTopics)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([topic, count]) => `${topic}: ${count} مرة`);

        const analysis = await groq.chat.completions.create({
          messages: [{
            role: 'system',
            content: 'أنت محلل بيانات ذكي. حلل إحصائيات التطبيق واقترح تحسينات.'
          }, {
            role: 'user',
            content: `
              إحصائيات التطبيق:
              - إجمالي التوليدات: ${stats.totalGenerations}
              - المواضيع الأكثر طلباً: ${topTopics.join(', ')}
              - الأساليب المفضلة: ${JSON.stringify(stats.popularStyles)}
              
              اقترح:
              1. ميزات جديدة يحتاجها المستخدمون
              2. تحسينات للأداء
              3. محتوى مقترح للمستخدمين
              4. استراتيجية ربح أفضل
            `
          }],
          model: 'llama-3.3-70b-versatile',
          max_tokens: 1000
        });

        const suggestion = analysis.choices[0].message.content;
        improvements.push({
          date: new Date().toISOString(),
          suggestion,
          stats: { ...stats }
        });

        stats.lastImproved = new Date().toISOString();
        return res.json({ success: true, suggestion, improvements });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }

    // حفظ ملاحظات المستخدم
    if (action === 'feedback') {
      stats.userFeedback.push({
        date: new Date().toISOString(),
        feedback: data.feedback,
        rating: data.rating
      });
      return res.json({ success: true });
    }
  }

  if (req.method === 'GET') {
    return res.json({ stats, improvements });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
