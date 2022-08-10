import styles from "./commentList.module.css";
import { useEffect } from "react";

const CommentList = ({ items, handleReloadComments }) => {
  useEffect(() => {
    console.log("loading");
  }, [items]);

  return (
    <div>
      <span style={{ marginLeft: "auto" }}>
        <button onClick={handleReloadComments}>Reload Comments</button>
      </span>
      <ul className={styles.comments}>
        {items.map((item) => (
          <li key={item._id}>
            <p>{item.comment}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
