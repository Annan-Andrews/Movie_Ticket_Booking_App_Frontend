import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/user/signup",
        data: data,
      });
      console.log("response::", response);
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
          navigate("/user");
        }, 500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-center",
        autoClose: 5000,
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

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Sign Up
        </h1>

        <form
          action="#"
          className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center text-lg font-medium">
            Sign up for your account
          </p>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
              {...register("name")}
              required
            />
          </div>

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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Mobile No.</span>
            </label>
            <input
              type="text"
              placeholder="Enter mobile no."
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
              {...register("mobile")}
              required
            />
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
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-500">
            Existing User?
            <a className="underline" onClick={() => navigate("/login")}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
