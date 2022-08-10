import { useState, useEffect, useContext } from "react";
import NotificationContext from "../../../store/notificationContext";
import CommentList from "../commentList/commentList";
import NewComment from "../newComment/newComment";
import styles from "./comments.module.css";

const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const notificationCtx = useContext(NotificationContext);
  const [isFetching, setIsFetching] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    if (showComments) {
      setIsFetching(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetching(false);
        });
    }
  }, [showComments, eventId]);

  const handleReloadComments = () => {
    setIsFetching(true);
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setIsFetching(false);
      });
  };

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Adding new comment",
      status: "pending",
    });
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
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
          title: "Success!!",
          message: "Your comment was added",
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
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetching && (
        <CommentList
          handleReloadComments={handleReloadComments}
          items={comments}
        />
      )}
      {showComments && isFetching && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
