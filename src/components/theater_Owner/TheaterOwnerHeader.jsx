import { useNavigate } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";
import { GiTheater } from "react-icons/gi";
import { TbLogout } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiHome } from "react-icons/fi";
import useLogout from "../../hooks/useLogout";
import useFetch from "../../hooks/useFetch";

const TheaterOwnerHeader = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [profileData, isLoading, error] = useFetch(
    "/theaterOwnerAdmin/profile"
  );

  const closeSidebar = () => {
    document.getElementById("my-drawer").checked = false;
  };

  return (
    <div className="flex">
      {/* Navbar */}
      <div className="flex flex-1 flex-col">
        <div className="navbar bg-slate-950 p-4 drop-shadow-2xl">
          <div className="drawer">
            {/* Drawer Toggle Input */}
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex items-center">
              {/* Hamburger Button */}
              <label htmlFor="my-drawer" className="cursor-pointer p-2">
                <GiHamburgerMenu className="text-white text-2xl" />
              </label>
            </div>

            {/* Sidebar Menu */}
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay "></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
                <div>
                  {/* Sidebar Content */}
                  <li>
                    <button
                      className="btn m-1"
                      onClick={() => {
                        navigate("/theaterOwner/dashboard");
                        closeSidebar();
                      }}
                    >
                      <FiHome /> Home
                    </button>
                  </li>
                  <li>
                    <details>
                      <summary className="btn m-1">
                        <GiTheater /> Theater
                      </summary>
                      <ul className="menu bg-base-100 rounded-box z-[1] w-50 p-2 shadow">
                        <li>
                          <a
                            onClick={() => {
                              navigate("/theaterOwner/create-theater");
                              closeSidebar();
                            }}
                          >
                            Create Theater
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              navigate("/theaterOwner/view-theaters");
                              closeSidebar();
                            }}
                          >
                            View Theaters
                          </a>
                        </li>
                        {/* <li>
                          <a>Edit Theaters</a>
                        </li> */}
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary className="btn m-1">
                        <RiMovie2Line /> Movies
                      </summary>
                      <ul className="menu bg-base-100 rounded-box z-[1] w-50 p-2 shadow">
                        <li>
                          <a
                            onClick={() => {
                              navigate("/theaterOwner/create-movie");
                              closeSidebar();
                            }}
                          >
                            Create Movie
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              navigate("/theaterOwner/view-movies");
                              closeSidebar();
                            }}
                          >
                            View Movies
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              navigate("/theaterOwner/view-MovieSchedules");
                              closeSidebar();
                            }}
                          >
                            View Movie Schedule
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </div>
                <li>
                  <button
                    onClick={logout}
                    className="group relative flex w-full justify-center rounded-lg px-2 py-4 text-sm text-gray-100 hover:bg-gray-200 hover:text-gray-900"
                  >
                    <TbLogout /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Profile & Logo */}
          <div className="flex-none gap-3">
            <div className="flex items-center gap-2">
              <div
                className="avatar placeholder cursor-pointer"
                onClick={() => navigate("/theaterOwner/profile")}
              >
                {profileData?.profilePic ? (
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700">
                    <img src={profileData?.profilePic} alt="Profile" />
                  </div>
                ) : (
                  <div className="bg-neutral text-neutral-content w-12 h-12 flex items-center justify-center rounded-full">
                    <span className="text-lg font-semibold">
                      {profileData?.name?.slice(0, 2)?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-base font-medium whitespace-nowrap text-white">
                Hi, {profileData?.name || "Theater Owner"}
              </span>
            </div>

            <img
              onClick={() => navigate("/theaterOwner/dashboard")}
              src="https://res.cloudinary.com/dnxflkosb/image/upload/v1739373180/Logo_nrplsu.png"
              alt="Movie Booking Logo"
              className="h-10 w-auto cursor-pointer rounded-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterOwnerHeader;
