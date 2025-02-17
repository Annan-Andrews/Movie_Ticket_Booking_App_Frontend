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
  const isTheaterOwnerAuth = useSelector(
    (state) => state.theaterOwner.isTheaterOwnerAuth
  );

  const handleLogout = async () => {
    try {
      // Define logout parameters
      let logoutApi = "";
      let action = null;
      let loginRoute = "";

      if (isUserAuth) {
        logoutApi = "/user/logout";
        action = clearUser;
        loginRoute = "/login";
      } else if (isTheaterOwnerAuth) {
        logoutApi = "/theaterOwnerAdmin/logout";
        action = clearTheaterOwner;
        loginRoute = "/theaterOwner/login";
      } else {
        toast.error("No active session found!");
        return;
      }

      
      const response = await axiosInstance.get(logoutApi);

      if (response.status === 200) {
        toast.success("Logout successfully!");

        setTimeout(() => {
          navigate(loginRoute);
        }, 500);

        dispatch(action());
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return handleLogout;
};

export default useLogout;
