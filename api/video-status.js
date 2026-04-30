module.exports = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID مطلوب' });

  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.REPLICATE_API_KEY}`,
      }
    });
    const data = await response.json();
    res.json({ status: data.status, output: data.output, error: data.error });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
