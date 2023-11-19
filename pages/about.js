import { authContext } from '@/context/AuthContext'

export default function About() {
  const { authenticatedUser } = authContext();

  return (
    <main>
      random baloney
    </main>
  )
}
