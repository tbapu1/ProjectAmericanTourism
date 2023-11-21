import Link from 'next/link';
import { authContext } from '../context/AuthContext';

const Navbar = () => {
  const { authenticatedUser } = authContext();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/cities">Cities</Link>
        </li>
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/enter">Login</Link>
        </li>
        {authenticatedUser && (
          <li>
            {/* Link to the authenticated user's profile */}
            <Link legacyBehavior href="/[username]" as={`/${authenticatedUser}`}>
              <a>{`Profile`}</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
