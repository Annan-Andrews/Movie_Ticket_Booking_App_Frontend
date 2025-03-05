import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ role = "user" }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const user =
    role === "theaterOwner"
      ? {
          role: "theaterOwner",
          signupAPI: "/theaterOwnerAdmin/signup",
          HomeRoute: "/theaterOwner/dashboard",
          loginRoute: "/theaterOwner/login",
        }
      : role === "admin"
      ? {
          role: "admin",
          signupAPI: "/theaterOwnerAdmin/signup",
          HomeRoute: "/admin/dashboard",
          loginRoute: "/admin/login",
        }
      : {
          role: "user",
          signupAPI: "/user/signup",
          HomeRoute: "/user",
          loginRoute: "/login",
        };

  const onSubmit = async (data) => {
    try {
      const requestData = {
        ...data,
        ...(role === "admin" && { role: "admin" }),
      };

      const response = await axiosInstance({
        method: "POST",
        url: user.signupAPI,
        data: requestData,
      });

      console.log("response::", response);
      if (response.status === 200) {
        toast.success("Account Created successfully!");

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
            ? "Join as a Theater Owner"
            : user?.role === "admin"
            ? "Join as a Admin"
            : "Join Us!"}
        </h1>

        <form
          action="#"
          className="mt-6 mb-0 space-y-4 rounded-lg bg-white dark:bg-gray-900 p-4 shadow-lg dark:shadow-gray-800 sm:p-6 lg:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">
            Sign up for your account
          </p>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-300">
                Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 pe-12 text-sm text-gray-900 dark:text-gray-100 shadow-xs"
              {...register("name")}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-300">
                Email
              </span>
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
              <span className="label-text text-gray-700 dark:text-gray-300">
                Mobile No.
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter mobile no."
              className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 pe-12 text-sm text-gray-900 dark:text-gray-100 shadow-xs"
              {...register("mobile")}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-300">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 pe-12 text-sm text-gray-900 dark:text-gray-100 shadow-xs"
              {...register("password")}
              required
            />
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 px-5 py-3 text-sm font-medium text-white dark:text-gray-900"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Existing User?{" "}
            <a
              className="underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 cursor-pointer"
              onClick={() => navigate(user.loginRoute)}
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
