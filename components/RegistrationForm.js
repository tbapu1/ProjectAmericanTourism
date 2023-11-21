import React, { useState } from 'react';
import { authContext } from '@/context/AuthContext';
const RegisterForm = ({ onRegistration }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [successful, setSuccess] = useState(null);
  const { authenticatedUser, setAuthenticatedUser } = authContext();
  const handleRegister = async () => {
    try {
      // Reset error state
      setError(null);
  
      // Validate password length
      if (password.length < 5) {
        setError('Password must be at least 5 characters long.');
        return;
      }
  
      // Validate password confirmation
      if (password !== confirmPassword) {
        setError('Password and confirm password do not match.');
        return;
      }
  
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, phoneNumber }),
      });
  
      if (response.ok) {
        const { success, user, error } = await response.json();
  
        if (success) {
          console.log('Registration success');
          console.log('User from server:', user);
          setSuccess("success");
          // Log in the user after successful registration
          const loginResponse = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
  
          if (loginResponse.ok) {
            const loginUser = await loginResponse.json();
            console.log('Login success');
            console.log('User from server:', loginUser);
  
            // Store the actual user data in localStorage
            localStorage.setItem('authenticatedUser', JSON.stringify(loginUser));
            setAuthenticatedUser(username);
          } else {
            console.error('Login failed after registration');
          }
  
          // If needed, you can pass the user data back to the parent component
          
        } else {
          setError(error);
          console.error('Registration failed:', error);
        }
      } else {
        setError('Username Already Taken!');
        console.error('Registration failed');
      }
    } catch (error) {
      setError('Error during registration. Please try again.');
      console.error('Error during registration:', error);
    }
  };
  
  

  return (
    <div>
      <h1>Registration Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successful && authenticatedUser && <p style={{ color: 'green' }}>Success! Welcome {authenticatedUser}!</p>}
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
