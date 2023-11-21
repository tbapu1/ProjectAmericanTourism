import React, { useState, useEffect } from 'react';

const EventDetails = ({ eventName }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/eventDetails?eventName=${eventName}`);
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
        } else {
          console.error('Error fetching event details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Event details</h1>
      {event ? (
        <div>
          <strong>{event.Event_Name}</strong>
          <p>Ticket Price: {event.Ticket_Price}</p>
          <p>Max Occupancy: {event.Max_Occupancy}</p>
          <p>Description: {event.Description}</p>
          <p>Date: {event.Date}</p>
          <p>Time: {event.Start_Time} - {event.End_Time}</p>
          <hr />
        </div>
      ) : (
        <p>No event found</p>
      )}
    </div>
  );
};

export default EventDetails;
