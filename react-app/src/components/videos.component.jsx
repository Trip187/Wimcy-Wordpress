import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const IframeVideo = () => {
  const base = window.THEME_ASSETS_URL + "/videos";

  const videos = [
    `${base}/video1.mp4`,
    `${base}/video2.mp4`,
    `${base}/video3.mp4`,
  ];
  const [currentVideo, setCurrentVideo] = useState(0);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1 === videos.length ? 0 : prev + 1));
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <video
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "10px",
        }}
        controls
        loop
        key={videos[currentVideo]}
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>

      {/* Prev Button */}
      <div
        onClick={prevVideo}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "50%",
          backdropFilter: "blur(8px)",
          background: "rgba(255,255,255,0.2)",
          zIndex: 10,
        }}
      >
        <IoIosArrowBack size={35} color="white" />
      </div>

      {/* Next Button */}
      <div
        onClick={nextVideo}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "50%",
          backdropFilter: "blur(8px)",
          background: "rgba(255,255,255,0.2)",
          zIndex: 10,
        }}
      >
        <IoIosArrowForward size={35} color="white" />
      </div>
    </div>
  );
};

export default IframeVideo;

/*
const IframeVideo =() =>{
  const videos = ["/videos/video1.mp4", "/videos/video2.mp4", "/videos/video3.mp4"];
  const[currentVideo, setCurrentVideo]= useState(0);
  const prev = () =>{
    setCurrentVideo((prev)=> (prev === 0 ? videos.length -1 : prev -1));
    
    }
    const next =()
=>{
  setCurrentVideo((prev)=> (prev +1 === videos.length ? 0 : prev +1));  }  }


*/
