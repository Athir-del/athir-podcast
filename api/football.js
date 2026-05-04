module.exports = async (req, res) => {
  const { endpoint } = req.query;
  try {
    const r = await fetch(`https://api.football-data.org/v4/${endpoint || 'matches'}`, {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
    });
    const d = await r.json();
    res.json(d);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
