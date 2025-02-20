import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../config/axiosInstance";
import { clearUser } from "../redux/features/userSlice";
import { clearTheaterOwner } from "../redux/features/theaterOwnerSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUserAuth = useSelector((state) => state.user.isUserAuth);
  const { isTheaterOwnerAuth, theaterOwnerData } = useSelector(
    (state) => state.theaterOwner
  );

  const authConfig =
    theaterOwnerData?.role === "admin"
      ? {
          role: "admin",
          logoutAPI: "/theaterOwnerAdmin/logout",
          action: clearTheaterOwner,
          loginRoute: "/admin/login",
        }
      : isTheaterOwnerAuth
      ? {
          role: "theaterOwner",
          logoutAPI: "/theaterOwnerAdmin/logout",
          action: clearTheaterOwner,
          loginRoute: "/theaterOwner/login",
        }
      : isUserAuth
      ? {
          role: "user",
          logoutAPI: "/user/logout",
          action: clearUser,
          loginRoute: "/login",
        }
      : null;

  const handleLogout = async () => {
    if (!authConfig) {
      toast.error("No active session found!");
      return;
    }

    try {
      const response = await axiosInstance.get(authConfig.logoutAPI);

      if (response.status === 200) {
        toast.success("Logout successfully!");

        setTimeout(() => {
          navigate(authConfig.loginRoute);
        }, 500);

        dispatch(authConfig.action());
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return handleLogout;
};

export default useLogout;
