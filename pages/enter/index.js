import Head from 'next/head';
import styles from '@/styles/Enter.module.css';
import React from 'react';
import { useContext } from 'react';
import LoginForm from '@/components/LoginForm';
import { authContext } from '@/context/AuthContext';

const Enter = () => {
const { authenticatedUser } = authContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Project American Tourism</title>
      </Head>

      <h1>Login Page</h1>
            <LoginForm/>
            {authenticatedUser && <p>Welcome, {authenticatedUser}!</p>}

    </div>
  )
};

export default Enter;
