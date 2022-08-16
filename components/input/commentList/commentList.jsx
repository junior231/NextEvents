import styles from "./commentList.module.css";

const CommentList = ({ items, handleReloadComments }) => {
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
