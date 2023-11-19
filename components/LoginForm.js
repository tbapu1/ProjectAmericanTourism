// components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { authContext } from '../context/AuthContext';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authenticatedUser, setAuthenticatedUser } = authContext();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('Login success');
        console.log('User from server:', user);

        // Store the actual user data in localStorage
        localStorage.setItem('authenticatedUser', JSON.stringify(user));
        setAuthenticatedUser(username);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    // Clear the stored user data in localStorage
    localStorage.removeItem('authenticatedUser');
    // Clear the authenticatedUser in the context
    setAuthenticatedUser(null);
  };

  return (
    <div>
      {authenticatedUser ? (
        <div>
          <p>Welcome, {authenticatedUser}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
