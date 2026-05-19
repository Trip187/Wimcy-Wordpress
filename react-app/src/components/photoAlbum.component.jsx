import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PhotoAlbum = () => {
  const base = window.THEME_ASSETS_URL + "/photos";

  const photos = [
    `${base}/mj1.JPG`,
    `${base}/mj2.JPG`,
    `${base}/mj3.JPG`,
    `${base}/mj4.JPG`,
    `${base}/mj5.JPG`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPhotos = photos.length;

  console.log("THEME_ASSETS_URL:", window.THEME_ASSETS_URL);
  console.log("Current photo:", photos[currentIndex]);

  const gotoPrevious = () => {
    const newIndex = currentIndex === 0 ? totalPhotos - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const gotoNext = () => {
    const newIndex = currentIndex === totalPhotos - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div
      className="photo-album"
      style={{
        position: "relative",
        height: "500px",
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div
        onClick={gotoPrevious}
        style={{
          position: "absolute",
          top: "50%",
          height: "50px",
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

      <img
        src={photos[currentIndex]}
        alt={`Photo ${currentIndex}`}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
      <div
        onClick={gotoNext}
        style={{
          position: "absolute",
          top: "50%",
          height: "50px",
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
export default PhotoAlbum;
