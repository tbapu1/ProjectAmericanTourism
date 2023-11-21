import React, { useState } from 'react';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [description, setDescription] = useState('');
  const [cityName, setCityName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can perform additional validation here before submitting the data

    try {
      const response = await fetch('/api/eventForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName,
          eventType,
          ticketPrice,
          maxOccupancy,
          description,
          cityName,
          startTime,
          endTime,
        }),
      });

      if (response.ok) {
        console.log('Event created successfully');
        // Optionally, you can redirect the user or perform other actions upon successful submission
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <label>
        Event Name:
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
      </label>
      <br />
      <label>
        Event Type:
        <input type="text" value={eventType} onChange={(e) => setEventType(e.target.value)} />
      </label>
      <br />
      <label>
        Ticket Price:
        <input type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
      </label>
      <br />
      <label>
        Max Occupancy:
        <input type="number" value={maxOccupancy} onChange={(e) => setMaxOccupancy(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        City Name:
        <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
      </label>
      <br />
      <label>
        Start Time:
        <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </label>
      <br />
      <label>
        End Time:
        <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;