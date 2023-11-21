import React, { useState, useEffect } from 'react';

const CityEvents = ({ cityName }) => { // Change prop name to cityName
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCityEvents = async () => {
    try {
      const response = await fetch(`/api/cityEvents?cityName=${cityName}`); 
      if (response.ok) {
        const cityEvents = await response.json();
        setEvents(cityEvents);
        
      } else {
        console.error('Failed to fetch city events');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCityEvents();
  }, [cityName]);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  const upcomingEvents = events.filter(event => new Date(event.Date) > new Date());
  const previousEvents = events.filter(event => new Date(event.Date) <= new Date());

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {upcomingEvents.map(event => (
          <li key={event.Event_ID}>{event.Name} - {event.Date}</li>
        ))}
      </ul>

      <h2>Previous Events</h2>
      <ul>
        {previousEvents.map(event => (
          <li key={event.Event_ID}>{event.Name} - {event.Date}</li>
        ))}
      </ul>
    </div>
  );
};

export default CityEvents;
