// Register.js
import Head from 'next/head';
import styles from '@/styles/Register.module.css';
import React from 'react';
import RegisterForm from '@/components/RegistrationForm'; 

const Register = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Project American Tourism</title>
      </Head>
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default Register;
