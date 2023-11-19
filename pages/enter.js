
import React from 'react';
import { useContext } from 'react';
import LoginForm from '../components/LoginForm';
import { authContext } from '../context/AuthContext';

const Enter = () => {
const { authenticatedUser } = authContext();

  return (
      <div>
        <h1>Login Page</h1>
            <LoginForm/>
            {authenticatedUser && <p>Welcome, {authenticatedUser}!</p>}
      </div>
  );
};

export default Enter;
