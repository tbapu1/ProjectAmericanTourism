import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CityEvents from '@/components/CityEvents';
const CityDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [cityDetails, setCityDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await fetch(`/api/cityDetails?slug=${slug}`);
        if (response.ok) {
          const details = await response.json();
          setCityDetails(details);
        } else {
          console.error('Failed to fetch city details');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCityDetails();
    }
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{cityDetails.Name}</h2>
      <p>Nickname: {cityDetails.Nickname}</p>
      <p>Population: {cityDetails.Population}</p>
      <CityEvents cityName={slug} />
    </div>
  );
};

export default CityDetails;
