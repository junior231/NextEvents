import Image from "next/image";

import Button from "../../ui/button/button";
import {
  HiCalendar,
  HiLocationMarker,
  HiArrowNarrowRight,
} from "react-icons/hi";

import styles from "./eventItem.module.css";

const EventItem = ({ title, image, date, location, id }) => {
  const eventDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  return (
    <li className={styles.item}>
      <Image
        width={350}
        height={300}
        objectFit="cover"
        src={`/${image}`}
        alt={title}
      />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <HiCalendar />
            <time>{eventDate}</time>
          </div>
          <div className={styles.address}>
            <HiLocationMarker />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <HiArrowNarrowRight />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
