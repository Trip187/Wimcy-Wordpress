import IframeVideo from "./components/videos.component";
import DarkTheme from "./components/DarkTheme.component";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.action";
import "./App.css";
import PhotoAlbum from "./components/photoAlbum.component";
import { useEffect } from "react";

import { onAuthStateChangedListener } from "./utils/firebase.utils";
import CommentList from "./components/comment-List.component";
import NewComment from "./components/new-comment.component";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);
  const commentId = "post-1"; // or whatever post id you want

  return (
    <>
      <IframeVideo />
      <DarkTheme />
      <PhotoAlbum />
      <CommentList comments={[]} postId={commentId} />
    </>
  );
}
export default App;
