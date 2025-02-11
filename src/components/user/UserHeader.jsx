import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/userSlice";

const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch
  const [profileData] = useFetch("/user/profile");

  const menuDropdownRef = useRef(null);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuDropdownRef.current &&
        !menuDropdownRef.current.contains(event.target)
      ) {
        setIsMenuDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/logout",
      });
      dispatch(clearUser());
      console.log("Logging out...");
      if (response.status === 200) {
        toast.success("Logout successfully!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle navigation & close dropdown
  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuDropdownOpen(false);
  };

  return (
    <div className="navbar bg-base-100">
      {/* Left Section: Logo + Search Bar */}
      <div className="flex-1 flex items-center gap-3">
        <a
          className="btn btn-ghost text-xl"
          onClick={() => handleNavigate("/user")}
        >
          Movie Booking
        </a>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
      </div>

      <div className="flex-none gap-3">
        <div className="flex items-center gap-2">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-12 h-12 flex items-center justify-center rounded-full">
              <span className="text-lg font-semibold">
                {profileData?.name?.slice(0, 2)?.toUpperCase() || "U"}
              </span>
            </div>
          </div>
          <span className="text-base font-medium whitespace-nowrap">
            Hi, {profileData?.name || "User"}
          </span>
        </div>

        {/* Hamburger Menu (Dropdown) */}
        <details
          ref={menuDropdownRef}
          className="dropdown dropdown-end"
          open={isMenuDropdownOpen}
          onToggle={(e) => setIsMenuDropdownOpen(e.target.open)}
        >
          <summary className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </summary>

          <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute right-0 mt-2">
            <li>
              <a onClick={() => handleNavigate("/user")}>Home</a>
            </li>
            <li>
              <a onClick={() => handleNavigate("/user/profile")}>Profile</a>
            </li>
            <li>
              <a onClick={() => handleNavigate("/movies")}>Movies</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            <li>
              <a onClick={handleLogOut}>Logout</a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default UserHeader;
