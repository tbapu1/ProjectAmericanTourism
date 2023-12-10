import React, { useState, useEffect } from 'react';
import styles from '../styles/CityEvents.module.css';

const CityEvents = ({ cityName }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityDetails, setCityDetails] = useState(null);

  // Fetch city details
  const fetchCityDetails = async () => {
    try {
      const response = await fetch(`/api/cityDetails?slug=${cityName}`);
      if (response.ok) {
        const cityDetailsData = await response.json();
        setCityDetails(cityDetailsData);
      } else {
        console.error('Failed to fetch city details');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch city events
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

  // Load city details and city events on component mount or cityName change
  useEffect(() => {
    fetchCityDetails();
    fetchCityEvents();
  }, [cityName]);

  // Show loading message while data is fetching
  if (loading || !cityDetails) {
    return <p>Loading...</p>;
  }

  const upcomingEvents = events.filter(event => new Date(event.Date) > new Date());
  const previousEvents = events.filter(event => new Date(event.Date) <= new Date());

  return (
    <div className={styles.cityEvents}>
      {/* Background Image */}
      <div className={styles.backgroundImage}></div>

      {/* Content */}
      <div className={styles.content}>
        {/* City Details */}
        <div className={styles.cityDetails}>
          <h1 className={styles.centerText}>{cityName}</h1>
          <p className={styles.centerText}>Nickname: {cityDetails.Nickname}</p>
          <p className={styles.centerText}>Population: {cityDetails.Population}</p>
        </div>

        {/* Upcoming Events */}
        <div className={styles.eventsList}>
          <h2>Upcoming Events</h2>
          <ul>
            {upcomingEvents.map(event => (
              <li key={event.Event_ID}>{event.Name} - {event.Date}</li>
            ))}
          </ul>
        </div>

        {/* Previous Events */}
        <div className={styles.eventsList}>
          <h2>Previous Events</h2>
          <ul>
            {previousEvents.map(event => (
              <li key={event.Event_ID}>{event.Name} - {event.Date}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CityEvents;
