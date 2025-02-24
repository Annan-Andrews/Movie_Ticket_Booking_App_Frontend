import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import DarkMode from "../shared/DarkMode";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100">
      {/* Left Section (Logo & Search) */}
      <div className="flex-1 flex items-center gap-3">
        <img
          onClick={() => navigate("/")}
          src="https://res.cloudinary.com/dnxflkosb/image/upload/v1739373180/Logo_nrplsu.png"
          alt="Movie Booking Logo"
          className="h-10 w-auto cursor-pointer rounded-sm"
        />
      </div>

      {/* Right Section (Login & Dropdown Menu) */}
      <div className="flex-none gap-3">
        <div className="navbar-end">
          {/* <a
            className="btn btn-error"
            onClick={() => navigate("/theaterOwner/login")}
          >
            Login
          </a> */}
        </div>
      </div>
      <DarkMode />
    </div>
  );
};

export default Header;
