// components/EventsAttended.js
import React, { useState, useEffect } from 'react';
import { authContext} from '../context/AuthContext';

const EventsAttended = () => {
  const { authenticatedUser } = authContext();
  const [eventsAttended, setEventsAttended] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEventsAttended = async () => {
    try {
      const response = await fetch(`/api/eventsAttended?username=${authenticatedUser}`);
      if (response.ok) {
        const attendedEvents = await response.json();
        setEventsAttended(attendedEvents);
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
    fetchEventsAttended();
  }, [authenticatedUser]); // Refetch when the authenticated user changes

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while data is being fetched
  }

  return (
    <div>
      <h2>Events Attended by {authenticatedUser}</h2>
      <ul>
        {eventsAttended.map((event) => (
          <li key={event.Event_ID}>{event.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventsAttended;
