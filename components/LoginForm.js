import React, { useState } from 'react';
import { authContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styles from '../styles/LoginForm.module.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authenticatedUser, setAuthenticatedUser } = authContext();
  const router = useRouter();

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
    localStorage.removeItem('authenticatedUser');
    setAuthenticatedUser(null);
  };

  const handleRegister = () => {
    router.push('/enter/register');
  };

  return (
    <div className={`${styles.loginBackground} ${styles.ctitle}`}>
          <p>‎ </p>
          <p>‎ </p>
          <p>‎ </p>
      <p>Login Page</p>
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
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
