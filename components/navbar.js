import Link from 'next/link';
import { authContext } from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';
const Navbar = () => {
  const { authenticatedUser } = authContext();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link href="/">
            <span className={styles.navLink}>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/cities">
            <span className={styles.navLink}>Cities</span>
          </Link>
        </li>
        <li>
          <Link href="/events">
            <span className={styles.navLink}>Events</span>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <span className={styles.navLink}>About</span>
          </Link>
        </li>
        <li>
          <Link href="/enter">
            <span className={styles.navLink}>Login</span>
          </Link>
        </li>

        {authenticatedUser && (
          <li>
            <Link href="/[username]" as={`/${authenticatedUser}`}>
              <span className={styles.navLink}>Profile</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
