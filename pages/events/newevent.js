import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { authContext } from '@/context/AuthContext'
import EventForm from '@/components/EventForm'
export default function AddEvent() {
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
      <EventForm></EventForm>
      </main>
      </div>
  )
}
