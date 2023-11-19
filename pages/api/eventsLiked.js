
import pool from '../../lib/db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { username } = req.query;
    const client = await pool.connect();

    try {
      const result = await client.query(
        'SELECT * FROM public."Event_Liked" el ' +
          'INNER JOIN public."Event" e ON el."Event_ID" = e."Event_ID" ' +
          'WHERE el."User_ID" = (SELECT "User_ID" FROM public."User" WHERE "Username" = $1)',
        [username]
      );
      const data = result.rows;

      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching liked events:', error);
      res.status(500).json({error: 'Internal server error' });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } else {
    res.status(405).end();
  }
};
