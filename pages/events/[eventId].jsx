import { useRouter } from "next/router";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventLogistics from "../../components/eventDetails/eventLogistics/eventLogistics";
import EventSummary from "../../components/eventDetails/eventSummary/eventSummary";
import EventContent from "../../components/eventDetails/eventContent/eventContent";
import ErrorAlert from "../../components/ui/errorAlert/error-alert";
import Head from "next/head";
import Comments from "../../components/input/comments/comments";

const EventDetails = ({ currentEvent }) => {
  // const router = useRouter();

  // const { eventId } = router.query;
  // const currentEvent = getEventById(eventId);

  if (!currentEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{currentEvent.title}</title>
        <meta name="description" content={currentEvent.description} />
      </Head>
      <EventSummary title={currentEvent.title} />
      <EventLogistics
        date={currentEvent.date}
        address={currentEvent.location}
        image={currentEvent.image}
        imageAlt={currentEvent.title}
      />
      <EventContent>
        <p>{currentEvent.description}</p>
      </EventContent>
      <Comments eventId={currentEvent.id} />
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

export async function getStaticProps(context) {
  const events = await getData();

  const { params } = context;

  const eventId = params.eventId;

  const currentEvent = events.find((event) => event.id === eventId);

  if (!currentEvent) {
    return { notFound: true };
  }

  return {
    props: { currentEvent },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getData();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetails;
