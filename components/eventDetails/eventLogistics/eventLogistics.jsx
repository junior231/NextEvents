import styles from "./eventLogistics.module.css";
import Image from "next/image";
import { HiCalendar, HiLocationMarker } from "react-icons/hi";

const EventLogistics = ({ date, address, image, imageAlt }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <Image
          src={`/${image}`}
          width={400}
          height={400}
          objectFit="cover"
          alt={imageAlt}
        />
      </div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <span className={styles.icon}>
            <HiCalendar />
          </span>
          <span className={styles.content}>
            <time>{formattedDate}</time>
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.icon}>
            <HiLocationMarker />
          </span>
          <span className={styles.content}>
            <address>{addressText}</address>
          </span>
        </li>
      </ul>
    </section>
  );
};

export default EventLogistics;
