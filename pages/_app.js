import Navbar from '@/components/navbar';
import { AuthProvider } from '../context/AuthContext';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
