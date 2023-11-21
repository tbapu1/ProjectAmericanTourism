import pool from '../../lib/db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { eventName } = req.query; 
    const client = await pool.connect();
    console.log("test");
    try {
      const result = await client.query(`
        SELECT e."Event_ID", e."Name" as "Event_Name", ed."Ticket_Price", ed."Max_Occupancy", ed."Description", t."Date", t."Start_Time", t."End_Time"
        FROM public."Event" e
        INNER JOIN public."Event_Details" ed ON e."Event_ID" = ed."Event_ID"
        LEFT JOIN public."Time_Slot" t ON ed."Time_Slot_ID" = t."Time_Slot_ID"
        WHERE e."Name" = $1
      `, [eventName]);

      const eventDetails = result.rows[0];
      
      if (eventDetails) {
        res.status(200).json(eventDetails);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
      
    } catch (error) {
      console.error('Error fetching event details:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.release();
    }
  } else {
    res.status(405).end();
  }
};
