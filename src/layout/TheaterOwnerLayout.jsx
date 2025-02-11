import React from "react";
// import Header from "../components/user/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";
import TheaterOwnerHeader from "../components/theater_Owner/TheaterOwnerHeader";

const TheaterOwnerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TheaterOwnerHeader />

      <ScrollToTop />
      {/* Main Content - Grow to push footer down */}
      <div className="flex-grow">
        <Outlet />
      </div>

      <span className="relative flex justify-center">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

        <span className="relative z-10 bg-white px-6"></span>
      </span>
      <Footer />
    </div>
  );
};

export default TheaterOwnerLayout;
