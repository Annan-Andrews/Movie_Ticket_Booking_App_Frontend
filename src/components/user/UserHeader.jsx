import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";

const UserHeader = () => {
  const navigate = useNavigate();

  const [profileData, isLoading, error] = useFetch("/user/profile");

  const handleLogOut = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/logout",
      });
      navigate("")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-100">
      {/* Left Section: Logo + Search Bar */}
      <div className="flex-1 flex items-center gap-3">
        <a className="btn btn-ghost text-xl" onClick={() => navigate("/user")}>
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

      {/* Right Section: Avatar + Dropdown */}
      <div className="flex-none gap-3">
        <div className="flex items-center gap-2">
          <div className="dropdown">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-12 h-12 flex items-center justify-center rounded-full">
                <span className="text-lg font-semibold">
                  {profileData?.name?.slice(0, 2)?.toUpperCase() || "U"}
                </span>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span className="text-base font-medium whitespace-nowrap">
            Hi, {profileData?.name || "User"}
          </span>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={() => navigate("/user")}>Home</a>
              </li>
              <li>
                <a onClick={() => navigate("/user/profile")}>Profile</a>
              </li>
              <li>
                <a onClick={() => navigate("/movies")}>Movies</a>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
