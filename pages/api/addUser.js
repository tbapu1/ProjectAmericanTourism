// pages/api/addUser.js
import pool from '../../db';

export default async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const client = await pool.connect();
    const query = 'INSERT INTO User (Username, Email, Password) VALUES ($1, $2, $3) RETURNING *';
    const result = await client.query(query, [username, email, password]);
    const insertedUser = result.rows[0];
    client.release();

    res.status(200).json(insertedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};
