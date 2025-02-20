import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ role = "user" }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const user =
    role === "theaterOwner"
      ? {
          role: "theaterOwner",
          loginAPI: "/theaterOwnerAdmin/login",
          HomeRoute: "/theaterOwner/dashboard",
          signupRoute: "/theaterOwner/signup",
        }
      : role === "admin"
      ? {
          role: "admin",
          loginAPI: "/theaterOwnerAdmin/login",
          HomeRoute: "/admin/dashboard",
          signupRoute: "/admin/signup",
        }
      : {
          role: "user",
          loginAPI: "/user/login",
          HomeRoute: "/user",
          signupRoute: "/signup",
        };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: user.loginAPI,
        data: data,
      });
      console.log("response::", response);
      if (response.status === 200) {
        toast.success("Login successfully!");

        setTimeout(() => {
          navigate(user.HomeRoute);
        }, 500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          {user?.role === "theaterOwner"
            ? "Welcome, Theater Owner!"
            : user?.role === "admin"
            ? "Welcome, Admin!"
            : "Welcome Back!"}
        </h1>

        <form
          action="#"
          className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center text-lg font-medium">
            Login to your account
          </p>

          <div className="form-control">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                {...register("email")}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
              {...register("password")}
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Login
          </button>
          {/* {user?.role === "user" ? */}
          <p className="text-center text-sm text-gray-500">
            No account?
            <a className="underline" onClick={() => navigate(user.signupRoute)}>
              Sign up
            </a>
          </p>
          {/* :} */}
        </form>
      </div>
    </div>
  );
};

export default Login;
