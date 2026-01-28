import { useCallback, useEffect, useState } from "react";
import { signInWithGooglePopup } from "../utils/firebase.utils";
import { getLongDate } from "../utils/datetime.utils";
import { useSelector, useDispatch } from "react-redux";
import NewComment from "./new-comment.component";
import { setCurrentUser } from "../store/user/user.action";
import { selectCurrentUser } from "../store/user/user.selector";
import classes from "../components/comments.styles.module.css";

const CommentList = ({ comments, postId }) => {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    setCommentList(comments);
  }, [comments]);
  const currentUser = useSelector(selectCurrentUser);

  console.log("DIRECT currentUser:", currentUser);

  const dispatch = useDispatch();

  const signInWithGoogle = useCallback(async () => {
    try {
      const response = await signInWithGooglePopup();
      console.log("SIGN IN RESPONSE:", response);
      dispatch(setCurrentUser(response.user));
    } catch (error) {
      console.error("SIGN IN FAILED:", error);
    }
  }, [dispatch]);
  const signOutHandler = () => {
    dispatch(setCurrentUser(null));
  };

  console.log("currentUser:", currentUser);

  const updateComments = (newComments) => {
    setCommentList(newComments);
  };

  return (
    <div>
      <hr />

      {!currentUser && (
        <div className={classes["sign-in-wrapper"]}>
          <span className={classes["lnk-sign-in"]} onClick={signInWithGoogle}>
            Sign in
          </span>

          <span> to post your comment.</span>
        </div>
      )}
      {currentUser && (
        <div className={classes["sign-in-wrapper"]}>
          <span className={classes["lnk-sign-in"]} onClick={signOutHandler}>
            Sign Out
          </span>
          <NewComment
            postId={postId}
            updateComments={updateComments}
            userDisplayName={currentUser.displayName}
          />
        </div>
      )}

      {commentList &&
        commentList

          .sort((a, b) => b.createdAt - a.createdAt)

          .map((c) => (
            <div key={c.createdAt}>
              <div className={classes["comment-wrapper"]}>
                <div className={classes["user"]}>{c.user}</div>

                <div>{c.comment}</div>

                <div className={classes["comment-date"]}>
                  {getLongDate(c.createdAt)}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};
export default CommentList;
