// import React, { useState } from "react";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";

// const Review = () => {
//   const [sliderRef, slider] = useKeenSlider({
//     loop: true,
//     slides: {
//       origin: "center",
//       perView: 1,
//       spacing: 16,
//     },
//     breakpoints: {
//       "(min-width: 640px)": { slides: { perView: 1.5, spacing: 16 } },
//       "(min-width: 768px)": { slides: { perView: 1.75, spacing: 16 } },
//       "(min-width: 1024px)": { slides: { perView: 3, spacing: 16 } },
//     },
//     slideChanged(slider) {
//       setCurrentSlide(slider.track.details.rel + 1);
//     },
//   });

//   const [currentSlide, setCurrentSlide] = useState(1);
//   const totalSlides = 3; 

//   return (
//     <section className="bg-white">
//       <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
//         <h2 className="text-center text-4xl font-bold text-gray-900 sm:text-5xl">
//           Read trusted reviews from our customers
//         </h2>

//         <div className="mt-8">
//           <div ref={sliderRef} className="keen-slider">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <div
//                 key={index}
//                 className={`keen-slider__slide transition-opacity duration-500 ${
//                   currentSlide === index + 1 ? "opacity-100" : "opacity-40"
//                 }`}
//               >
//                 <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8">
//                   <div className="flex items-center gap-4">
//                     <div>
//                       <p className="text-lg font-medium text-gray-900">
//                         Reviewer {index + 1}
//                       </p>
//                     </div>
//                   </div>
//                   <p className="mt-4 text-gray-700">
//                     "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//                   </p>
//                 </blockquote>
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-4 text-gray-600">
//             Slide {currentSlide} of {totalSlides}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Review;
