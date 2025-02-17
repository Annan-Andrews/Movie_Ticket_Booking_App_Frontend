import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/user/Footer";
import Header from "../components/user/Header";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import { axiosInstance } from "../config/axiosInstance";
import UserHeader from "../components/user/UserHeader";
import ScrollToTop from "../components/shared/ScrollToTop";
import { ToastContainer, toast, Bounce } from "react-toastify";

const UserLayout = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [searchQuery, setSearchQuery] = useState(""); // Store search query

  console.log("isUserAuth====", isUserAuth);

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });

      console.log("check-user response ====", response);

      dispatch(saveUser(response?.data?.token));
    } catch (error) {
      dispatch(clearUser());
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {/* Pass setSearchQuery and setSearchResults to Header */}
      {isUserAuth ? (
        <UserHeader
          setSearchQuery={setSearchQuery}
          setSearchResults={setSearchResults}
        />
      ) : (
        <Header
          setSearchQuery={setSearchQuery}
          setSearchResults={setSearchResults}
        />
      )}

      <ScrollToTop />
      {/* Main Content - Grow to push footer down */}
      <div className="flex-grow pb-20">
        <Outlet context={{ searchResults, searchQuery }} />
      </div>

      <span className="relative flex justify-center">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 opacity-75"></div>
        <span className="relative z-10 bg-white px-6"></span>
      </span>

      <Footer />
    </div>
  );
};

export default UserLayout;
