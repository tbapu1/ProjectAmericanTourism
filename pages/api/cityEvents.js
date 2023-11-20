
import pool from '../../lib/db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { cityName } = req.query;
    
    const client = await pool.connect();
    try {
        
      const result = await client.query(
        'SELECT e."Event_ID", e."Name", e."Type", ts."Date" FROM public."Event_Details" ed JOIN public."Event" e ON ed."Event_ID" = e."Event_ID" JOIN public."Time_Slot" ts ON ed."Time_Slot_ID" = ts."Time_Slot_ID" JOIN public."City" c ON ed."City_ID" = c."City_ID" WHERE c."Name" = $1',
        [cityName]
      );
      
      const data = result.rows;
      
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching city events:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.release();
    }
  } else {
    res.status(405).end();
  }
};
