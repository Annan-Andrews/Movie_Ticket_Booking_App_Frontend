import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CreateTheaterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/theater/create-theater",
        data
      );
      console.log("response::", response);
      if (response.status === 200) {
        toast.success("Theater Created successfully!");

        setTimeout(() => {
          navigate("/theaterOwner/dashboard");
        }, 500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-gray-800 p-8 shadow-xl lg:col-span-3 lg:p-12">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Theater Name */}
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-300">
            Theater Name
          </label>
          <input
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
            placeholder="Enter Theater Name"
            type="text"
            id="name"
            {...register("name", { required: "Theater Name is required" })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Seats Field */}
        <div>
          <label
            htmlFor="totalseats"
            className="block font-semibold text-gray-300"
          >
            Seats
          </label>
          <input
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
            placeholder="Enter Number of Seats"
            type="number"
            id="totalseats"
            min="1"
            {...register("totalseats", {
              required: "Number of Seats is required",
              min: { value: 1, message: "Seats must be at least 1" },
            })}
          />
          {errors.totalseats && (
            <p className="mt-1 text-sm text-red-400">
              {errors.totalseats.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block font-semibold text-gray-300"
          >
            Location
          </label>
          <textarea
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
            placeholder="Enter Location"
            rows="4"
            id="location"
            {...register("location", { required: "Location is required" })}
          ></textarea>
          {errors.location && (
            <p className="mt-1 text-sm text-red-400">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-500"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Create Theater"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTheaterForm;
