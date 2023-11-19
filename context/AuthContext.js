// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      // Check if there's a user stored in localStorage on initial load
      const storedUser = localStorage.getItem('authenticatedUser');
      if(storedUser !== "null"){
        setAuthenticatedUser(storedUser);
      } 
      
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever the authenticatedUser changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('authenticatedUser', authenticatedUser);
    }
  }, [authenticatedUser]);

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function authContext() {
  return React.useContext(AuthContext);
}

export { AuthProvider };
