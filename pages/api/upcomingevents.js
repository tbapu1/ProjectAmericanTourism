import pool from '../../lib/db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT e."Event_ID", e."Name", e."Type", ts."Date" FROM public."Event_Details" ed JOIN public."Event" e ON ed."Event_ID" = e."Event_ID" JOIN public."Time_Slot" ts ON ed."Time_Slot_ID" = ts."Time_Slot_ID"'
      );

      const allEvents = result.rows;

      // Filter events based on the current year
      const currentYear = new Date().getFullYear();
      const upcomingEvents = allEvents.filter(
        (event) => new Date(event.Date).getFullYear() === currentYear
      );

      res.status(200).json(upcomingEvents);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.release();
    }
  } else {
    res.status(405).end();
  }
};
