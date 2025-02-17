import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { axiosInstance } from "../../config/axiosInstance";

const Header = ({ setSearchResults, setSearchQuery }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

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
      {/* Left Section (Logo & Search) */}
      <div className="flex-1 flex items-center gap-3">
        <img
          onClick={() => navigate("/")}
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

      {/* Right Section (Login & Dropdown Menu) */}
      <div className="flex-none gap-3">
        <div className="navbar-end">
          <a className="btn btn-error" onClick={() => navigate("/login")}>
            Login
          </a>
        </div>

        {/* Hamburger Menu (Dropdown) */}
        <details
          ref={menuDropdownRef}
          className="dropdown dropdown-end"
          open={isMenuDropdownOpen}
          onToggle={(e) => setIsMenuDropdownOpen(e.target.open)}
        >
          <summary className="btn btn-ghost">
            <GiHamburgerMenu className="text-white text-2xl" />
          </summary>

          <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute right-0 mt-2">
            <li>
              <a onClick={() => handleNavigate("/")}>Home</a>
            </li>
            <li>
              <a onClick={() => handleNavigate("/movies")}>Movies</a>
            </li>
            <li>
              <a onClick={() => handleNavigate("/about")}>About</a>
            </li>
            <li>
              <a onClick={() => handleNavigate("/contact")}>Contact</a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Header;
