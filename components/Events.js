import React, { useState, useEffect } from 'react';
import { authContext} from '../context/AuthContext';
import NextLink from 'next/link';

const Events = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/events`);
      if (response.ok) {
        const cities = await response.json();
        setCities(cities);
      } else {
        console.error('Failed to fetch events attended');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); // Refetch when the authenticated user changes
  
  if (loading) {
    return <p>Loading...</p>; // Display a loading message while data is being fetched
  }

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {cities.map((event) => (
          <li key={event.City_ID}>
          <NextLink legacyBehavior href={`/events/${event.Name}`}>
            <a>{event.Name}</a>
          </NextLink>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
