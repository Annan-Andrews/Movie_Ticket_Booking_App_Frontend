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
        <h1 className="text-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 sm:text-3xl">
          {user?.role === "theaterOwner"
            ? "Welcome, Theater Owner!"
            : user?.role === "admin"
            ? "Welcome, Admin!"
            : "Welcome Back!"}
        </h1>

        <form
          action="#"
          className="mt-6 mb-0 space-y-4 rounded-lg bg-white dark:bg-gray-900 p-4 shadow-lg dark:shadow-gray-800 sm:p-6 lg:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">
            Login to your account
          </p>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-900 dark:text-gray-100">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 pe-12 text-sm text-gray-900 dark:text-gray-100 shadow-xs"
              {...register("email")}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-900 dark:text-gray-100">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 pe-12 text-sm text-gray-900 dark:text-gray-100 shadow-xs"
              {...register("password")}
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt text-gray-600 dark:text-gray-400 link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 dark:bg-indigo-500 px-5 py-3 text-sm font-medium text-white"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            No account?{' '}
            <a
              className="underline text-indigo-600 dark:text-indigo-400 cursor-pointer"
              onClick={() => navigate(user.signupRoute)}
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
