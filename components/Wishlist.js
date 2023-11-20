import React, { useState, useEffect } from 'react';
import { authContext } from '../context/AuthContext';
import NextLink from 'next/link';
const Wishlist = () => {
  const { authenticatedUser } = authContext();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`/api/wishlist?username=${authenticatedUser}`);
      if (response.ok && authenticatedUser) {
        const userWishlist = await response.json();
        setWishlist(userWishlist);
      } else {
        console.error('Failed to fetch wishlist');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [authenticatedUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Wishlist for {authenticatedUser}</h2>
      <ul>
        {wishlist.map((city) => (
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

export default Wishlist;
