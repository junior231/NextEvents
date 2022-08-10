import { getAllEvents } from "../../dummyData";
import EventList from "../../components/events/eventList/EventList";
import EventSearch from "../../components/events/eventSearch/eventSearch";
import { useRouter } from "next/router";
import Head from "next/head";

const Events = ({ events }) => {
  // const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const path = `/events/${year}/${month}`;

    router.push(path);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Search and find available events." />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

async function getData() {
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

  return events;
}

export async function getStaticProps() {
  const events = await getData();

  return {
    props: { events },
    revalidate: 60,
  };
}

export default Events;
