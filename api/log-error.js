module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { msg, src, line, time } = req.body;
  console.error(`[ERROR] ${time} | ${msg} | ${src}:${line}`);
  res.json({ logged: true });
};
