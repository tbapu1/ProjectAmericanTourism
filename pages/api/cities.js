
import pool from '../../lib/db';

export default async (req, res) => {
  if (req.method === 'GET') {
    
    const client = await pool.connect();
    try {
      
      const result = await client.query(
        'SELECT "Name" FROM public."City"'
      );

      const data = result.rows;
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching events attended:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.release();
    }
  } else {
    res.status(405).end();
  }
};
