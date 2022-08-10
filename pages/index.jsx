import EventList from "../components/events/eventList/EventList";
import Head from "next/head";
import NewsLetterRegistration from "../components/input/newsletter/newsletterRegistration";

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events Finder</title>
        <meta name="description" content="Search and find available events." />
      </Head>
      <NewsLetterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-api-69a50-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  const featuredEvents = events.filter((event) => event.isFeatured);

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
