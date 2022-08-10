import styles from "./eventContent.module.css";

const EventContent = ({ children }) => {
  return <section className={styles.content}>{children}</section>;
};

export default EventContent;
