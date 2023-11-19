// pages/api/testData.js
import pool from "@/lib/db";

export default async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT Username FROM User');
    const data = result.rows;
    client.release();

    if (data.length === 0) {
      console.log('No data found in the users table.');
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};
