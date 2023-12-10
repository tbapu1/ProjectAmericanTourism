import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { authContext } from '@/context/AuthContext';

export default function Home() {
  const { authenticatedUser } = authContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Project American Tourism</title>
        <meta name="description" content="Explore and discover American tourism destinations and events." />
      </Head>
      
      <main>
        <div className={styles.hero}>
          <img src="/AmericanNight.jpg" alt="American Night" />
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h1 className={styles.title}>Welcome to Project American Tourism</h1>
            {authenticatedUser && <p className={styles.greeting}>Welcome, {authenticatedUser}!</p>}
          </div>
        </div>
      </main>

    </div>
  );
}
