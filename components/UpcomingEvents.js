import React, { useState, useEffect } from 'react';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch(`/api/upcomingevents`);
      if (response.ok) {
        const allEvents = await response.json();
        const currentYear = new Date().getFullYear();
        
        // Filter events based on the current year
        const upcomingEvents = allEvents.filter(
          (event) => new Date(event.Date).getFullYear() === currentYear
        );

        setEvents(upcomingEvents);
      } else {
        console.error('Failed to fetch upcoming events');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.Event_ID}>
            {event.Name} - {event.Date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
