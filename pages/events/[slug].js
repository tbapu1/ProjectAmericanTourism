
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { authContext } from '@/context/AuthContext'
import EventDetails from '@/components/EventDetails'
import { useRouter } from 'next/router';

export default function EventDetailsPage() {
  const router = useRouter();
  const { authenticatedUser } = authContext();
  const { slug } = router.query; 

  return (
    <main>
       {slug && <EventDetails eventName={slug} />}
       
    </main>
  )
}
