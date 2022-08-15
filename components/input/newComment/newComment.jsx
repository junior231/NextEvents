import { useState } from "react";
import styles from "./newComment.module.css";

const NewComment = (props) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  function sendCommentHandler(event) {
    event.preventDefault();

    const enteredEmail = email;
    const enteredName = name;
    const enteredComment = comment;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email,
      name,
      comment,
    });

    setComment('')
    setName('')
    setEmail('')
  }

  return (
    <form className={styles.form} onSubmit={sendCommentHandler}>
      <div className={styles.row}>
        <div className={styles.control}>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea
          id="comment"
          rows="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email, address and comment!</p>}
      <span>
        <button style={{ backgroundColor: "white" }}>Submit</button>
      </span>
    </form>
  );
};

export default NewComment;
