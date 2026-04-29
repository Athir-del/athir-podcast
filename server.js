const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', app: 'Athir Podcast Bot' });
});

app.post('/api/generate', async (req, res) => {
  const { script } = req.body;
  if (!script) return res.status(400).json({ error: 'Script is required' });
  res.json({ message: 'تم استلام السكريبت بنجاح!', script });
});

app.listen(port, () => {
  console.log(`Athir Podcast Bot running at http://localhost:${port}`);
});
