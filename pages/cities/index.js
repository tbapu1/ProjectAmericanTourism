import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { authContext } from '@/context/AuthContext'
import Cities from '@/components/Cities'
export default function Home() {
  const { authenticatedUser } = authContext();

  return (
    <main>
      <Cities></Cities>
    </main>
  )
}
