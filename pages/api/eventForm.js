import pool from '../../lib/db';

export default async (req, res) => {
    if (req.method === 'POST') {
      const {
        eventName,
        eventType,
        ticketPrice,
        maxOccupancy,
        description,
        cityName,
        startTime,
        endTime,
      } = req.body;
      const client = await pool.connect();
  
      try {
        await client.query('BEGIN'); // Start a transaction
  
        // Get the next available Event_ID
        const nextEventIdResult = await client.query(
          'SELECT max("Event_ID") + 1 as "NextEventId" FROM public."Event"'
        );
        const nextEventId = nextEventIdResult.rows[0].NextEventId || 1;
  
        // Insert the new event into the database
        const eventResult = await client.query(
          'INSERT INTO public."Event" ("Event_ID", "Name", "Type") VALUES ($1, $2, $3) RETURNING "Event_ID"',
          [nextEventId, eventName, eventType]
        );
  
        const eventId = eventResult.rows[0].Event_ID;
  
        // Get the next available Time_Slot_ID
        const nextTimeSlotIdResult = await client.query(
          'SELECT max("Time_Slot_ID") + 1 as "NextTimeSlotId" FROM public."Time_Slot"'
        );
        const nextTimeSlotId = nextTimeSlotIdResult.rows[0].NextTimeSlotId || 1;
  
        // Insert time slot into the database
        const timeSlotResult = await client.query(
          'INSERT INTO public."Time_Slot" ("Time_Slot_ID", "Start_Time", "End_Time") VALUES ($1, $2, $3) RETURNING "Time_Slot_ID"',
          [nextTimeSlotId, startTime, endTime]
        );
  
        const timeSlotId = timeSlotResult.rows[0].Time_Slot_ID;
  
        // Insert event details into the database
        await client.query(
          'INSERT INTO public."Event_Details" ("Ticket_Price", "Max_Occupancy", "Description", "Event_ID", "City_ID", "Time_Slot_ID") VALUES ($1, $2, $3, $4, (SELECT "City_ID" FROM public."City" WHERE "Name" = $5), $6)',
          [ticketPrice, maxOccupancy, description, eventId, cityName, timeSlotId]
        );
  
        await client.query('COMMIT'); // Commit the transaction
  
        res.status(201).json({ message: 'Event created successfully' });
      } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction if any error occurs
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });
      } finally {
        client.release();
      }
    } else {
      res.status(405).end();
    }
  };
  