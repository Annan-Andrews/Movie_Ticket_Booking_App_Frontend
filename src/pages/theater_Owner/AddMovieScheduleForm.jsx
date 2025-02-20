import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config/axiosInstance";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";

const AddMovieScheduleForm = () => {
  const { theaterOwnerData } = useSelector((state) => state.theaterOwner);
  const { id: ownerId } = theaterOwnerData || {};
  const { theaterId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [moviesResponse, isLoading, error] = useFetch(
    ownerId ? `/movies/view-movies/${ownerId}` : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/theater/add-movie-schedules/${theaterId}`,
        data
      );

      if (response.status === 200) {
        toast.success("Movie schedule added successfully!");
        setTimeout(() => {
          navigate(`/theaterOwner/theaterDetails/${theaterId}`);
        }, 500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (moviesResponse) {
      // Optionally, reset form if data is fetched
      reset();
    }
  }, [moviesResponse, reset]);

  if (isLoading) return <Skeleton />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white text-center">
        Add Movie Schedule
      </h2>

      <div className="rounded-xl bg-gray-800 p-8 shadow-xl lg:col-span-3 lg:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Movie Dropdown */}
          <div>
            <label
              htmlFor="movieId"
              className="block font-semibold text-gray-300"
            >
              Select Movie
            </label>
            <select
              id="movieId"
              {...register("movieId", { required: "Movie is required" })}
              className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Select Movie</option>
              {moviesResponse?.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
            {errors.movieId && (
              <p className="mt-1 text-sm text-red-400">
                {errors.movieId.message}
              </p>
            )}
          </div>

          {/* Show Time */}
          <div>
            <label
              htmlFor="showTime"
              className="block font-semibold text-gray-300"
            >
              Show Time
            </label>
            <input
              type="time"
              id="showTime"
              {...register("showTime", { required: "Show time is required" })}
              className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
            />
            {errors.showTime && (
              <p className="mt-1 text-sm text-red-400">
                {errors.showTime.message}
              </p>
            )}
          </div>

          {/* Show Date */}
          <div>
            <label
              htmlFor="showDate"
              className="block font-semibold text-gray-300"
            >
              Show Date
            </label>
            <input
              type="date"
              id="showDate"
              {...register("showDate", { required: "Show date is required" })}
              className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
            />
            {errors.showDate && (
              <p className="mt-1 text-sm text-red-400">
                {errors.showDate.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block font-semibold text-gray-300"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price", { required: "Price is required" })}
              className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-400">
                {errors.price.message}
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
                "Add Movie Schedule"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieScheduleForm;
