import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useLogout from "../../hooks/useLogout";
import { GiHamburgerMenu } from "react-icons/gi";
import { axiosInstance } from "../../config/axiosInstance";

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
    <div className="navbar bg-base-100">
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
            className="input input-bordered w-24 md:w-auto"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="flex-none gap-3">
        <div className="flex items-center gap-2">
          {profileData?.profilePic ? (
            <div className="avatar">
              <div className="w-12 h-12 rounded-full border-2 border-white">
                <img src={profileData?.profilePic} alt="Profile" />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-12 h-12 flex items-center justify-center rounded-full border-2 border-white">
                <span className="text-lg font-semibold">
                  {profileData?.name?.slice(0, 2)?.toUpperCase() || "U"}
                </span>
              </div>
            </div>
          )}
          <span className="text-base font-medium whitespace-nowrap text-white">
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
            <GiHamburgerMenu className="text-white text-2xl" />
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
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default UserHeader;
