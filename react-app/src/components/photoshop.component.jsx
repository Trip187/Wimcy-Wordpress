import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import photoshop1 from "../assets/photos/photoshop1.jpg";
import photoshop2 from "../assets/photos/photoshop2.jpg";
import photoshop3 from "../assets/photos/photoshop3.jpg";
import photoshop4 from "../assets/photos/photoshop4.jpg";
import photoshop5 from "../assets/photos/photoshop4.jpg";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Photoshop = () => {
  const images = [photoshop1, photoshop2, photoshop3, photoshop4, photoshop5];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // -1 left, +1 right

  // AutoPlay every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImages();
    }, 3000);

    return () => clearInterval(interval);
  });

  const prevImages = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? images.length - 3 : prev - 1));
  };

  const nextImages = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 3 >= images.length ? 0 : prev + 1));
  };

  const visibleImages = images.slice(current, current + 3);

  // Animation variants
  const variants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      scale: 0.9,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      scale: 0.9,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          {visibleImages.map((img, i) => (
            <motion.img
              key={`${img}-${current}-${i}`}
              src={img}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.3 },
              }}
              style={{
                width: "250px",
                height: "auto",
                borderRadius: "14px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Prev Button */}
      <div
        onClick={prevImages}
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
        onClick={nextImages}
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

export default Photoshop;
