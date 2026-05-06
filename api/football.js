module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { endpoint } = req.query;
  try {
    const r = await fetch(`https://api.football-data.org/v4/${endpoint}`, {
      headers: { 
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
        'Accept': 'application/json'
      }
    });
    if (!r.ok) {
      const err = await r.json();
      return res.status(r.status).json({ error: err.message || 'API Error' });
    }
    const d = await r.json();
    res.json(d);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
