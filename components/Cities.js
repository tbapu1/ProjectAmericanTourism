import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Cities.module.css';

const getImageForCity = (cityName) => {
  if (cityName === 'Chicago') {
    return '/Chicago.jpg'; 
  } else if (cityName === 'Dallas') {
    return '/Dallas.jpg';
  } else if (cityName === 'New York') {
    return '/NewYork.jpg';
  } else if (cityName === 'Los Angeles') {
    return '/LosAngeles.jpg';
  } 
};

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCities = async () => {
    try {
      const response = await fetch(`/api/cities`);
      if (response.ok) {
        const cities = await response.json();
        setCities(cities);
      } else {
        console.error('Failed to fetch cities');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.citiesContainer}>
      <h1 className={styles.title}>Cities</h1>
      <div className={styles.cityGrid}>
        {cities.map((city) => (
          <div key={city.City_ID} className={styles.cityItem}>
            <Link href={`/cities/${city.Name}`} passHref>
              <div>
                <img
                  src={getImageForCity(city.Name)}
                  alt={`Image of ${city.Name}`}
                  className={styles.cityImage}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cities;
