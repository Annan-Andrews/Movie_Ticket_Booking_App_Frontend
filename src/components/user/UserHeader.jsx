import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useLogout from "../../hooks/useLogout";
import { GiHamburgerMenu } from "react-icons/gi";
import { axiosInstance } from "../../config/axiosInstance";
import DarkMode from "../shared/DarkMode";

const UserHeader = ({ setSearchResults, setSearchQuery }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const [profileData] = useFetch("/user/profile");
  const logout = useLogout();

  const menuDropdownRef = useRef(null);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults([]); // Clear search results if input is empty
      return;
    }

    try {
      console.log("Calling Search API...");

      const response = await axiosInstance.get(
        `/movies/search-movies?title=${value}`
      );
      setSearchResults(response.data.data); // Store search results
      console.log(response.data);
    } catch (error) {
      console.error("Search API Error:", error);
      setSearchResults([]); // Clear results if API fails
    }
  };

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

  // Handle navigation & close dropdown
  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuDropdownOpen(false);
  };

  return (
    <div className="navbar bg-base-100 dark:bg-gray-900">
      {/* Left Section: Logo + Search Bar */}
      <div className="flex-1 flex items-center gap-3">
        <img
          onClick={() => navigate("/user")}
          src="https://res.cloudinary.com/dnxflkosb/image/upload/v1739373180/Logo_nrplsu.png"
          alt="Movie Booking Logo"
          className="h-10 w-auto cursor-pointer rounded-sm"
        />
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto dark:bg-gray-800 dark:text-white text-black"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="flex-none gap-3">
        <div className="flex items-center gap-2">
          {profileData?.profilePic ? (
            <div className="avatar">
              <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700">
                <img src={profileData?.profilePic} alt="Profile" />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral dark:bg-gray-700 text-neutral-content w-12 h-12 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-700">
                <span className="text-lg font-semibold dark:text-white text-black">
                  {profileData?.name?.slice(0, 2)?.toUpperCase() || "U"}
                </span>
              </div>
            </div>
          )}
          <span className="text-base font-medium whitespace-nowrap dark:text-white text-black">
            Hi, {profileData?.name || "User"}
          </span>
        </div>

        <DarkMode />

        {/* Hamburger Menu (Dropdown) */}
        <details
          ref={menuDropdownRef}
          className="dropdown dropdown-end"
          open={isMenuDropdownOpen}
          onToggle={(e) => setIsMenuDropdownOpen(e.target.open)}
        >
          <summary className="btn btn-ghost btn-circle dark:text-white text-black">
            <GiHamburgerMenu className="text-2xl" />
          </summary>

          <ul className="dropdown-content menu bg-base-100 dark:bg-gray-800 rounded-box z-[1] w-52 p-2 shadow absolute right-0 mt-2">
            <li>
              <a onClick={() => handleNavigate("/user")} className="dark:text-white text-black">Home</a>
            </li>
            <li>
              <a onClick={() => handleNavigate("/user/profile")} className="dark:text-white text-black">Profile</a>
            </li>
            <li>
              <a onClick={() => handleNavigate("/movies")} className="dark:text-white text-black">Movies</a>
            </li>
            <li>
              <a onClick={() => handleNavigate("/user/view-bookings")} className="dark:text-white text-black">
                My Bookings
              </a>
            </li>
            <li>
              <a className="dark:text-white text-black">About</a>
            </li>
            <li>
              <a className="dark:text-white text-black">Contact</a>
            </li>
            <li>
              <a onClick={logout} className="dark:text-white text-black">Logout</a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default UserHeader;
