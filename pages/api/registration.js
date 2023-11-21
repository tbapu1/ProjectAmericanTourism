import pool from '../../lib/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password, email, phoneNumber } = req.body;
    const client = await pool.connect();

    try {
      // Check if the username already exists
      const existingUser = await client.query('SELECT * FROM public."User" WHERE "Username" = $1', [username]);

      if (existingUser.rows.length > 0) {
        res.status(400).json({ success: false, error: 'Username already exists' });
        return;
      }

      // Get the current highest User_ID
      const maxUserIdResult = await client.query('SELECT MAX("User_ID") FROM public."User"');
      const maxUserId = maxUserIdResult.rows[0].max || 0;

      // Insert the new user with User_ID as 1 plus the previous highest User_ID
      const result = await client.query(
        'INSERT INTO public."User" ("User_ID", "Username", "Password", "Email", "Phone_Number") VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [maxUserId + 1, username, password, email, phoneNumber]
      );
      const newUser = result.rows[0];

      res.status(200).json({ success: true, user: newUser });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    } finally {
      client.release();
    }
  } else {
    res.status(405).end();
  }
};
