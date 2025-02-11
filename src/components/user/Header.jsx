import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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

  // Handle navigation & close dropdown
  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuDropdownOpen(false);
  };

  return (
    <div className="navbar bg-base-100">
      {/* Left Section (Logo & Search) */}
      <div className="flex-1 flex items-center gap-3">
        <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
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
