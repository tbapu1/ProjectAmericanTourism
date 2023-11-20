import pool from '../../lib/db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { slug } = req.query;
    const client = await pool.connect();

    try {
      const result = await client.query(
        'SELECT * FROM public."City" WHERE "Name" = $1',
        [slug]
      );
      const cityDetails = result.rows[0];

      if (cityDetails) {
        res.status(200).json(cityDetails);
      } else {
        res.status(404).json({ error: 'City not found' });
      }
    } catch (error) {
      console.error('Error fetching city details:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } else {
    res.status(405).end();
  }
};
