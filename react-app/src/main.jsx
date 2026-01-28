import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import DarkTheme from "./components/DarkTheme.component";
import IframeVideo from "./components/videos.component";
import PhotoAlbum from "./components/photoAlbum.component";
import CommentList from "./components/comment-List.component";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Mount the main React app (needed for React DevTools)
const mainRoot = document.getElementById("root");
if (mainRoot) {
  createRoot(mainRoot).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
}

// Optional: Mount Dark Mode Component elsewhere
const darkRoot = document.getElementById("dark-mode-root");
if (darkRoot) {
  createRoot(darkRoot).render(<DarkTheme />);
}

// Optional: Mount Video Component
const videoRoot = document.getElementById("video-root");
if (videoRoot) {
  createRoot(videoRoot).render(<IframeVideo />);
}
// optional : mount photo album component
const photoAlbumRoot = document.getElementById("photo-album-root");
if (photoAlbumRoot) {
  createRoot(photoAlbumRoot).render(<PhotoAlbum />);
}
const commentRoot = document.getElementById("comment-list-root");

if (commentRoot) {
  const postId = commentRoot.dataset.postId;

  createRoot(commentRoot).render(
    <Provider store={store}>
      <CommentList postId={postId} comments={[]} />
    </Provider>,
  );
}
