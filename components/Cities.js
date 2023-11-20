import React, { useState, useEffect } from 'react';
import { authContext} from '../context/AuthContext';
import NextLink from 'next/link';

const Cities = () => {
  const { authenticatedUser } = authContext();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCities = async () => {
    try {
      const response = await fetch(`/api/cities`);
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
    fetchCities();
  }, []); // Refetch when the authenticated user changes
  
  if (loading) {
    return <p>Loading...</p>; // Display a loading message while data is being fetched
  }

  return (
    <div>
      <h2>Cities</h2>
      <ul>
        {cities.map((city) => (
          <li key={city.City_ID}>
          <NextLink legacyBehavior href={`/cities/${city.Name}`}>
            <a>{city.Name}</a>
          </NextLink>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Cities;
