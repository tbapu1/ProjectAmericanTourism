import Head from 'next/head';
import styles from '@/styles/Cities.module.css';
import { authContext } from '@/context/AuthContext'
import Cities from '@/components/Cities'
export default function Home() {
  const { authenticatedUser } = authContext();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
          <img src="/AmericanNight.jpg" alt="American Night" />
          <div className={styles.overlay}></div>
          <div className={styles.content}>
          </div>
        </div>
      <Head>
        <title>Project American Tourism</title>
      </Head>

      <main>
      <h1 className={styles.title}></h1>
        <Cities></Cities>
      </main>

    </div>
  )
}
