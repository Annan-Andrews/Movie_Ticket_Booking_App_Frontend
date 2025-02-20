import React, { useEffect } from "react";
// import Header from "../components/user/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/user/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";
import TheaterOwnerHeader from "../components/theater_Owner/TheaterOwnerHeader";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTheaterOwner,
  saveTheaterOwner,
} from "../redux/features/theaterOwnerSlice";
import Header from "../components/theater_Owner/Header";
import { axiosInstance } from "../config/axiosInstance";
import AdminHeader from "../components/admin/AdminHeader";

const TheaterOwnerLayout = () => {
  const { isTheaterOwnerAuth, theaterOwnerData } = useSelector(
    (state) => state.theaterOwner
  );
  const dispatch = useDispatch();
  const location = useLocation();

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/theaterOwnerAdmin/check-user",
      });

      console.log("check-user response ====", response);

      dispatch(saveTheaterOwner(response?.data?.token));
    } catch (error) {
      dispatch(clearTheaterOwner());
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  useEffect(() => {
    console.log("Updated Redux State:", theaterOwnerData); // Debugging
  }, [theaterOwnerData]);

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

      {isTheaterOwnerAuth ? (
        theaterOwnerData?.role === "admin" ? (
          <AdminHeader />
        ) : (
          <TheaterOwnerHeader />
        )
      ) : (
        <Header />
      )}

      <ScrollToTop />
      {/* Main Content - Grow to push footer down */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* <span className="relative flex justify-center">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

        <span className="relative z-10 bg-white px-6"></span>
      </span>
      <Footer /> */}
    </div>
  );
};

export default TheaterOwnerLayout;
