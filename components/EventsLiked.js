import React, { useState, useEffect } from 'react';
import { authContext} from '../context/AuthContext';

const EventsLiked = () => {
  const { authenticatedUser } = authContext(); // Use useAppContext instead of authContext
  const [eventsLiked, setEventsLiked] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEventsLiked = async () => {
    try {
      const response = await fetch(`/api/eventsLiked?username=${authenticatedUser}`);
      if (response.ok && authenticatedUser) {
        const likedEvents = await response.json();
        setEventsLiked(likedEvents);
      } else {
        console.error('Failed to fetch liked events');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsLiked();
  }, [authenticatedUser]); // Refetch when the authenticated user changes

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while data is being fetched
  }

  return (
    <div>
      <h2>Events Liked by {authenticatedUser}</h2>
      <ul>
        {eventsLiked.map((event) => (
          <li key={event.Event_ID}>{event.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventsLiked;
