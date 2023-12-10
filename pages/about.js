import Head from 'next/head';
import styles from '@/styles/About.module.css';
import { authContext } from '@/context/AuthContext';

export default function About() {
  const { authenticatedUser } = authContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Project American Tourism - About</title>
      </Head>

      <div className={styles.backgroundImage}></div>

      <main className={styles.content}>
        <section className={styles.projectDescription}>
          <p>‎ </p>
          
          <h1>About Project American Tourism</h1>
          <p>
            Project American Tourism (PAT) focuses on delivering a user-centric experience by 
            placing individual users' unique needs and preferences at the core of its design and 
            functionality.
            <br /><br />
            Our dedication to user satisfaction is evident in PAT's primary objective: to empower 
            individuals seeking memorable tourism experiences within US cities by tailoring a vast 
            array of resources and services to enhance their visits.
            <br /><br />
            The user-centric philosophy is reflected in PAT's designed Entity-Relationship (ER) model.
            At its heart lies the "User" entity, a cornerstone of personalization. Attributes such 
            as "Username," "Password," and "Email" enable PAT to provide a personalized experience 
            for each user, allowing them to create individual accounts, finely customize preferences, 
            and receive insightful recommendations based on their unique interests and past interactions.
            <br /><br />
            Entities like "Events_Attended," "Events_Liked," and "Wishlist" further underscore PAT's 
            commitment to aligning with user desires. Users can actively record and manage their interactions 
            with events, effectively curating their tourism experiences based on their past choices.
            <br /><br />
            PAT offers an expansive platform that serves as a valuable resource for tourists, with multiple 
            key functionalities. Users can effortlessly track their activities by adding events they've attended 
            and liked, thereby creating a personalized record of their interests and past experiences.
            <br /><br />
            Each event is associated with a unique ID, providing detailed information that includes the event 
            name, type, maximum occupancy, ticket price, description, and related attractions. These events are 
            intrinsically linked to the city in which they occur, delivering crucial geographical context for users.
            <br /><br />
            PAT is dedicated to user engagement, satisfaction, and autonomy, striving to make every exploration 
            of US cities more meaningful, efficient, and tailored to individual preferences.
          </p>
        </section>

        <section className={styles.teamDescription}>
          <h2>Our Team</h2>

          <div className={styles.teamMember}>
            <h3>Tashi Bapu</h3>
            <p>
              Tashi contributed significantly to the CSS design, bringing creativity and 
              attention to detail to the project. He played a crucial role in the visual 
              presentation and user interface, ensuring an appealing and intuitive design.
            </p>
          </div>

          <div className={styles.teamMember}>
            <h3>John Chmura</h3>
            <p>
              John specialized in SQL retrieval and integration into the website using 
              JavaScript. His expertise in database interaction and query execution 
              facilitated seamless data retrieval and manipulation for a robust user experience.
            </p>
          </div>

          <div className={styles.teamMember}>
            <h3>Magnus Mikhail</h3>
            <p>
              Magnus was instrumental in setting up the SQL database in PgAdmin4. His 
              proficiency in database administration ensured a well-structured and 
              efficient database architecture, laying a solid foundation for the project.
            </p>
          </div>

          <div className={styles.teamMember}>
            <h3>Thupten Wangpo</h3>
            <p>
              Thupten collaborated on CSS development and project error checking. His 
              meticulous approach to error identification and resolution, combined with 
              his CSS expertise, contributed significantly to the project's stability and 
              overall quality.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
