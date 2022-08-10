import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummyData";
import EventList from "../../components/events/eventList/EventList";
import ResultsTitle from "../../components/events/results/resultsTitle";
import Button from "../../components/ui/button/button";
import ErrorAlert from "../../components/ui/errorAlert/error-alert";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

const FilteredEventsPage = () => {
  const [events, setEvents] = useState();
  const router = useRouter();

  const filteredData = router.query.slug;

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    "https://nextjs-api-69a50-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered Events`} />
    </Head>
  );

  if (!events) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          {" "}
          <p>Invalid Filter Values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const { year, month } = filteredDate;

  // const filteredEvents = events;

  // const date = new Date(year, month - 1);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the selected filter values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// async function getData() {
//   const response = await fetch(
//     "https://nextjs-api-69a50-default-rtdb.firebaseio.com/events.json"
//   );

//   const data = await response.json();

//   const events = [];

//   for (const key in data) {
//     events.push({
//       id: key,
//       ...data[key],
//     });
//   }

//   return events;
// }

// export async function getServerSideProps(context) {
//   const events = await getData();
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = events.filter((event) => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === numYear &&
//       eventDate.getMonth() === numMonth - 1
//     );
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       filteredDate: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
