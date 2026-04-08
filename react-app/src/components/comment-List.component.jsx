import { useEffect, useCallback, useState } from "react";
import {
  signInWithGooglePopup,
  signOutUser,
  onAuthStateChangedListener,
  getCommentsForPost,
} from "../utils/firebase.utils";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../store/user/user.action";
import { selectCurrentUser } from "../store/user/user.selector";
import NewComment from "./new-comment.component";
import { getLongDate } from "../utils/datetime.utils";
import classes from "../components/comments.styles.module.css";

const CommentList = ({ comments, postId }) => {
  const [commentList, setCommentList] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  // 🔑 SYNC Redux FROM FIREBASE
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentsForPost(postId);
        setCommentList(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  const signInWithGoogle = useCallback(async () => {
    try {
      await signInWithGooglePopup();
      // 🚫 DO NOT dispatch here
    } catch (error) {
      console.error("SIGN IN FAILED:", error);
    }
  }, []);

  const signOutHandler = async () => {
    await signOutUser();
    // 🚫 Redux will update automatically
  };

  const updateComments = (updater) => {
    setCommentList((prev) =>
      typeof updater === "function" ? updater(prev) : updater,
    );
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
