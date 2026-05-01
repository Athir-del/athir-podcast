module.exports = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID مطلوب' });

  try {
    const response = await fetch(`https://api.dev.runwayml.com/v1/tasks/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'X-Runway-Version': '2024-11-06'
      }
    });
    const data = await response.json();
    res.json({ 
      status: data.status, 
      output: data.output,
      error: data.error 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
