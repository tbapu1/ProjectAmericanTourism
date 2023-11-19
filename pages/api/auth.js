import pool from '../../lib/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM public."User" WHERE "Username" = $1 AND "Password" = $2', [username, password]);
      const data = result.rows;

      if (data.length === 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } else {
    res.status(405).end();
  }
};
