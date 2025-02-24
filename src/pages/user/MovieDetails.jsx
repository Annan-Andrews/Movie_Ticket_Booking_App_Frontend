import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";
import { BsFillStarFill } from "react-icons/bs";
import Reviews from "../../components/user/Review";
import { axiosInstance } from "../../config/axiosInstance";

const MovieDetails = () => {
  const { movieId } = useParams();
  const { isUserAuth } = useSelector((state) => state.user);
  const { register, handleSubmit, reset } = useForm();
  const [movie, isLoading] = useFetch(`/movies/get-movie-details/${movieId}`);
  const [averageRating] = useFetch(`/review/get-avg-rating/${movieId}`);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await axiosInstance({
      method: "POST",
      url: "/review/add-review",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...data, movieId },
    });
    const result = await response.json();
    if (response.ok) {
      alert("Review added successfully!");
      reset();
    } else {
      alert(result.message);
    }
  };

  if (isLoading) return <Skeleton />;

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.poster})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-10 flex flex-col sm:flex-row gap-8">
        <div
          className="w-64 h-96 bg-cover bg-center rounded-lg shadow-2xl"
          style={{ backgroundImage: `url(${movie.image})` }}
        ></div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="flex items-center text-lg mt-2">
            <BsFillStarFill className="text-yellow-400" /> &nbsp;{" "}
            {averageRating}/5
          </p>
          <p className="text-lg mt-2">{movie?.genre?.join(", ")}</p>
          <p className="text-lg mt-2">{movie.description}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Duration: {movie.duration} min
          </p>

          <button
            className="mt-5 bg-red-600 text-white px-6 py-2 font-semibold rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            onClick={() => navigate(`/theaterSelection/${movieId}`)}
          >
            Book Tickets
          </button>
        </div>
      </div>

      {isUserAuth && (
        <div className="container mx-auto px-4 py-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Add Your Review
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <input
                  type="number"
                  placeholder="Rating (1-5)"
                  className="input input-bordered w-full max-w-xs bg-white text-black dark:bg-gray-800 dark:text-white"
                  min="1"
                  max="5"
                  {...register("rating", { required: true, min: 1, max: 5 })}
                />
              </div>

              <div className="relative">
                <textarea
                  placeholder="Write your review"
                  className="textarea textarea-bordered textarea-lg w-full max-w-xs bg-white text-black dark:bg-gray-800 dark:text-white"
                  {...register("comment", { required: true })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-40 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Add Review
              </button>
            </form>
          </div>
        </div>
      )}

      <Reviews movieId={movie._id} />
    </div>
  );
};

export default MovieDetails;
