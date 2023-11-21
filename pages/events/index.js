import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { authContext } from '@/context/AuthContext'
import Events from '@/components/Events'
export default function Home() {
  const { authenticatedUser } = authContext();

  return (
    <main>
      <Events></Events>
    </main>
  )
}
