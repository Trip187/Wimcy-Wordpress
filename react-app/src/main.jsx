import { createRoot } from "react-dom/client";
import App from "./App";
import DarkTheme from "./components/DarkTheme.component";
import IframeVideo from "./components/videos.component";
import Photoshop from "./components/photoshop.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

//react testing
console.log("🔥 React script loaded");

// Ensure WordPress has fully rendered the page before mounting React
document.addEventListener("DOMContentLoaded", () => {
  // Main React App
  const mainRoot = document.getElementById("root");
  if (mainRoot) {
    createRoot(mainRoot).render(<App />);
  }

  // Dark Mode Widget
  const darkRoot = document.getElementById("dark-mode-root");
  if (darkRoot) {
    createRoot(darkRoot).render(<DarkTheme />);
  }

  // Video Component
  const videoRoot = document.getElementById("video-root");
  if (videoRoot) {
    createRoot(videoRoot).render(<IframeVideo />);
  }

  // Photoshop Component
  const photoshopRoot = document.getElementById("photoshop-root");
  if (photoshopRoot) {
    createRoot(photoshopRoot).render(<Photoshop />);
  }
});
