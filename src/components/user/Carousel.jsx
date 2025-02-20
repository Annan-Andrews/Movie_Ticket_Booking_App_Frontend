import React, { useState, useEffect } from "react";

const images = [
  // "https://res.cloudinary.com/dnxflkosb/image/upload/v1740043890/Screenshot_2025-02-20_150008_1_dfgdmg.png",
  "https://res.cloudinary.com/dnxflkosb/image/upload/v1739895402/Carousel_1_zhdnyw.png",
  "https://res.cloudinary.com/dnxflkosb/image/upload/v1740043657/Red_and_Cream_Modern_Minimalist_Movie_Ticket_bsfogv.jpg",
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[296px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            className="w-full h-[296px] object-cover flex-shrink-0"
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="btn btn-circle opacity-50 hover:opacity-100"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle opacity-50 hover:opacity-100"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
