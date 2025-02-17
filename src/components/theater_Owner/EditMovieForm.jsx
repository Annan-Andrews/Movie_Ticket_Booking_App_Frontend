import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../shared/Skeleton";

const EditMovieForm = ({ movieId }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [movie, isLoading, error] = useFetch(
    `/movies/get-movie-details/${movieId}`
  );

  useEffect(() => {
    if (movie) {
      setValue("title", movie.title);
      setValue("description", movie.description);
      setValue("genre", movie.genre);
      setValue("duration", movie.duration);

      const formattedDate = movie.releaseDate
        ? new Date(movie.releaseDate).toISOString().split("T")[0]
        : "";
      setValue("releaseDate", formattedDate);

      setValue("language", movie.language);
      setValue("rating", movie.rating);
      setImagePreview(movie.image);
      setPosterPreview(movie.poster);
    }
  }, [movie, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("genre", data.genre);
      formData.append("duration", data.duration);
      formData.append("releaseDate", data.releaseDate);
      formData.append("language", data.language);
      if (data.rating) formData.append("rating", data.rating);
      if (data.image?.[0]) formData.append("image", data.image[0]);
      if (data.poster?.[0]) formData.append("poster", data.poster[0]);

      const response = await axiosInstance.post(
        `/movies/edit-movie/${movieId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success("Movie updated successfully!");
        setTimeout(() => {
          navigate("/theaterOwner/dashboard");
        }, 500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  if (isLoading) return <Skeleton />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="rounded-xl bg-gray-800 p-8 shadow-xl lg:col-span-3 lg:p-12">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Movie Title */}
        <div>
          <label htmlFor="title" className="block font-semibold text-gray-300">
            Movie Title
          </label>
          <input
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500"
            type="text"
            id="title"
            {...register("title", { required: "Movie Title is required" })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-semibold text-gray-300"
          >
            Description
          </label>
          <textarea
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500"
            rows="4"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="genre" className="block font-semibold text-gray-300">
            Genre
          </label>
          <input
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500"
            type="text"
            id="genre"
            {...register("genre", { required: "Genre is required" })}
          />
          {errors.genre && (
            <p className="mt-1 text-sm text-red-400">{errors.genre.message}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="block font-semibold text-gray-300"
          >
            Duration (in minutes)
          </label>
          <input
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500"
            type="number"
            id="duration"
            min="1"
            {...register("duration", {
              required: "Duration is required",
              min: { value: 1, message: "Duration must be at least 1 minute" },
            })}
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-400">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* Release Date */}
        <div>
          <label
            htmlFor="releaseDate"
            className="block font-semibold text-gray-300"
          >
            Release Date
          </label>
          <input
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500"
            type="date"
            id="releaseDate"
            {...register("releaseDate", {
              required: "Release Date is required",
            })}
          />
          {errors.releaseDate && (
            <p className="mt-1 text-sm text-red-400">
              {errors.releaseDate.message}
            </p>
          )}
        </div>

        {/* Language */}
        <div>
          <label
            htmlFor="language"
            className="block font-semibold text-gray-300"
          >
            Language
          </label>
          <input
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500"
            type="text"
            id="language"
            {...register("language", { required: "Language is required" })}
          />
          {errors.language && (
            <p className="mt-1 text-sm text-red-400">
              {errors.language.message}
            </p>
          )}
        </div>

        {/* Rating (Optional) */}
        <div>
          <label htmlFor="rating" className="block font-semibold text-gray-300">
            Rating (Optional)
          </label>
          <input
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-500"
            type="number"
            step="0.1"
            min="0"
            max="5"
            {...register("rating")}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block font-semibold text-gray-300">
            Movie Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register("image")}
            onChange={(e) =>
              setImagePreview(URL.createObjectURL(e.target.files[0]))
            }
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 rounded-lg"
            />
          )}
        </div>

        {/* Poster Upload */}
        <div>
          <label htmlFor="poster" className="block font-semibold text-gray-300">
            Movie Poster
          </label>
          <input
            type="file"
            id="poster"
            accept="image/*"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register("poster")}
            onChange={(e) =>
              setPosterPreview(URL.createObjectURL(e.target.files[0]))
            }
          />
          {posterPreview && (
            <img
              src={posterPreview}
              alt="Preview"
              className="mt-2 w-32 rounded-lg"
            />
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
              "Update Movie"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;
