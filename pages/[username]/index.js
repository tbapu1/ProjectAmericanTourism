import { useRouter } from 'next/router';
import EventsAttended from '@/components/EventsAttended';
import EventsLiked from '@/components/EventsLiked';
import Wishlist from '@/components/Wishlist';
import styles from '@/styles/UserProfile.module.css';

const UserProfile = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className={styles.userProfileContainer}>
      <h1>User Profile Page</h1>
      <p>Username: {username}</p>
      <EventsAttended />
      <EventsLiked />
      <Wishlist />
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default UserProfile;
