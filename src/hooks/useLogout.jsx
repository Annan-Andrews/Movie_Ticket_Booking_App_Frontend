import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../config/axiosInstance";
import { clearUser } from "../redux/features/userSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/user/logout");

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

        dispatch(clearUser());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return handleLogout;
};

export default useLogout;
