import Head from 'next/head';
import styles from '@/styles/Events.module.css';
import { authContext } from '@/context/AuthContext'
import Events from '@/components/Events'
export default function Home() {
  const { authenticatedUser } = authContext();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
          <img src="/AmericanNight.jpg" alt="American Night" />
          <div className={styles.overlay}></div>
          <div className={styles.content}></div>
        </div>
      <Head>
        <title>Project American Tourism</title>
      </Head>

      <main>
        <Events></Events>
      </main>

    </div>
  )
}
