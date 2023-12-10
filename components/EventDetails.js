import React, { useState, useEffect } from 'react';
import styles from '../styles/CityEvents.module.css';
const EventDetails = ({ eventName }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch event details
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

  if (loading || !event) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.cityEvents}>
      {/* Background Image */}
      <div className={styles.backgroundImage}></div>

      {/* Content */}
      <div className={styles.content}>
        {/* Event Details */}
        <div className={styles.cityDetails}>
          <p>‎ </p>
          <p>‎ </p>
          <p>‎ </p>
          <h1 className={styles.centerText}>Event Details</h1>
          <strong>{event.Event_Name}</strong>
          <p>Ticket Price: {event.Ticket_Price}</p>
          <p>Max Occupancy: {event.Max_Occupancy}</p>
          <p>Description: {event.Description}</p>
          <p>Date: {event.Date}</p>
          <p>Time: {event.Start_Time} - {event.End_Time}</p>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
