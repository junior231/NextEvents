import styles from "./newsletter.module.css";
import { useState, useContext } from "react";
import NotificationContext from "../../../store/notificationContext";

const NewsLetterRegistration = () => {
  const [email, setEmail] = useState("");
  const notificationCtx = useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();

    const payload = {
      email: email,
    };

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for Newsletter",
      status: "pending",
    });

    // optional: validate input

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!!!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully registered for Newsletter",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsLetterRegistration;
