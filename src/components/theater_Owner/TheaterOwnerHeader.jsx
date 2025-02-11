import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiMovie2AiLine } from "react-icons/ri";
import { GiTheater } from "react-icons/gi";
import { TbLogout } from "react-icons/tb";
import useFetch from "../../hooks/useFetch";

const TheaterOwnerHeader = () => {
  const navigate = useNavigate();
  const [profileData] = useFetch("/theaterOwnerAdmin/profile");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex h-screen w-16 flex-col justify-between border-e-4 bg-slate-950">
        <div>
          <div className="inline-flex size-16 items-center justify-center">
            <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-base font-semibold text-black">
              {profileData?.name?.slice(0, 2)?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="border-t border-slate-800">
            <div className="px-2 py-4">
              <a
                href="#"
                className="group relative flex justify-center rounded-sm bg-blue-50 px-2 py-1.5 text-blue-700"
              >
                <CgProfile />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-100 px-2 py-1.5 text-xs font-semibold text-black group-hover:visible">
                  Profile
                </span>
              </a>
            </div>
            <div className="px-2 py-4">
              <a
                href="#"
                className="group relative flex justify-center rounded-sm bg-blue-50 px-2 py-1.5 text-blue-700"
              >
                <RiMovie2AiLine />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-100 px-2 py-1.5 text-xs font-semibold text-black group-hover:visible">
                  Movies
                </span>
              </a>
            </div>
            <div className="px-2 py-4">
              <a
                href="#"
                className="group relative flex justify-center rounded-sm bg-blue-50 px-2 py-1.5 text-blue-700"
              >
                <GiTheater />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-100 px-2 py-1.5 text-xs font-semibold text-black group-hover:visible">
                  Theater
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="sticky inset-x-0 bottom-0 border-t border-slate-800 bg-slate-950 p-2">
          <button className="group relative flex w-full justify-center rounded-lg px-2 py-4 text-sm text-gray-100 hover:bg-gray-200 hover:text-gray-900">
            <TbLogout />

            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Navbar */}
      <div className="flex flex-1 flex-col">
        <div className="navbar bg-slate-950 p-4  drop-shadow-2xl">
          <a
            className="btn btn-ghost text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            Movie Booking
          </a>
        </div>
      </div>
    </div>
  );
};

export default TheaterOwnerHeader;
