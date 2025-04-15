const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { dateFrom, dateTo } = req.query;
  const url = `https://api.football-data.org/v4/competitions/PL/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;
  try {
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': '17ee52ab7c3d494794f524ea8abff2f8' // Token của bạn
      }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'API request failed' });
  }
};