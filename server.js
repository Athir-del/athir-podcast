const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
const port = process.env.PORT || 3000;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', app: 'Athir Podcast Bot' });
});

app.post('/api/generate', async (req, res) => {
  const { script } = req.body;
  if (!script) return res.status(400).json({ error: 'السكريبت مطلوب' });

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'أنت محرر بودكاست محترف. حسّن السكريبت المقدم وأضف له إيقاعاً احترافياً باللغة العربية.'
        },
        {
          role: 'user',
          content: script
        }
      ],
      model: 'llama3-8b-8192',
    });

    const improved = completion.choices[0].message.content;
    res.json({ message: 'تم التوليد بنجاح!', result: improved });
  } catch (err) {
    res.status(500).json({ error: 'خطأ في التوليد: ' + err.message });
  }
});

app.listen(port, () => {
  console.log(`Athir Podcast Bot running at http://localhost:${port}`);
});
