import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { authContext } from '@/context/AuthContext'
import EventForm from '@/components/EventForm'
export default function AddEvent() {
  const { authenticatedUser } = authContext();

  return (
    <main>
      <EventForm/>
    </main>
  )
}
