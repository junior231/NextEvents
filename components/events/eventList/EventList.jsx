import EventItem from "../eventItem/EventItem";
import styles from "./eventList.module.css";

const EventList = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <EventItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default EventList;
