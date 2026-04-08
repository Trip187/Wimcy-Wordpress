import { useRef, useState } from "react";

import { addCommentToPost } from "../utils/firebase.utils";

import classes from "./new-comment.styles.module.css";

const NewComment = ({ postId, userDisplayName, updateComments }) => {
  const [isPending, setIsPending] = useState(false);

  const commentRef = useRef();

  const postCommentHandler = async () => {
    const newComment = commentRef.current.value.trim();
    if (!newComment) return;

    setIsPending(true);

    try {
      const createdComment = await addCommentToPost(
        postId,
        userDisplayName,
        newComment,
      );

      commentRef.current.value = "";

      updateComments((prev) => [createdComment, ...prev]);
    } catch (err) {
      alert("Posting failed. Please try again.");
      console.error(err);
    }

    setIsPending(false);
  };

  return (
    <div>
      <textarea
        placeholder="Write a comment..."
        rows="2"
        ref={commentRef}
        className={classes["message-box"]}
      />

      <div className={classes["btn-container"]}>
        <button onClick={postCommentHandler} disabled={isPending}>
          Post it
        </button>
      </div>
    </div>
  );
};

export default NewComment;
