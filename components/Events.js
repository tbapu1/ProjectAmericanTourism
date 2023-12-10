import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import styles from '../styles/Events.module.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageForEvent = (eventName) => {
    switch (eventName) {
      case 'Texas State Fair':
        return '/TexasStateFair.jpg';
      case 'Illinois State Fair':
        return '/IllinoisStateFair.jpg';
      case 'Waldos Escape Room':
        return '/WaldosEscapeRoom.jpg';
      case 'Los Angeles Museum of Art':
        return '/LosAngelesMuseumOfArt.jpg';
      case 'Museum of Science and Industry':
        return '/MuseumOfScienceAndIndustry.jpg';
      default:
        return '';
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/events`);
      if (response.ok) {
        const eventsData = await response.json();
        setEvents(eventsData);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.eventsContainer}>
      <h1 className={styles.title}>Events</h1>
      <div className={styles.eventGrid}>
        {events.map((event) => (
          <div key={event.Event_ID} className={styles.eventItem}>
            <NextLink legacyBehavior href={`/events/${event.Name}`} passHref>
              <div>
                <img
                  src={getImageForEvent(event.Name)}
                  alt={`Image of ${event.Name}`}
                  className={styles.eventImage}
                />
              </div>
            </NextLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
