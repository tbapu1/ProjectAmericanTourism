import { useRouter } from 'next/router';
import EventsAttended from '@/components/EventsAttended';
import EventsLiked from '@/components/EventsLiked'
const UserProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  return (
    <div>
      <h1>User Profile Page</h1>
      <p>Username: {username}</p>
      <EventsAttended></EventsAttended>
      <EventsLiked></EventsLiked>
    </div>
  );
};
export async function getServerSideProps(context) {
    // Fetch data and pass it as a prop
    // Here, you might want to fetch any additional data needed for the dashboard
    return {
      props: {}, // You can pass additional props here
    };
  }
export default UserProfile;
