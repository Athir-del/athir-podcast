exports.handler = async (event) => {
  const endpoint = event.queryStringParameters?.endpoint;
  if (!endpoint) return { statusCode: 400, body: JSON.stringify({ error: 'endpoint required' }) };
  try {
    const r = await fetch(`https://api.football-data.org/v4/${endpoint}`, {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
    });
    const d = await r.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(d)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
