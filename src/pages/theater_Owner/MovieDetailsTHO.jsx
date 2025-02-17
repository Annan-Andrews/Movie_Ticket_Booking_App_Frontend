import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";
import { BsFillStarFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config/axiosInstance";
import MovieDelete from "../../components/theater_Owner/MovieDelete";

const MovieDetailsTHO = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  // Fetch movie details
  const [movie, isLoading, error] = useFetch(
    `/movies/get-movie-details/${movieId}`
  );

  // Fetch average rating
  const [averageRating] = useFetch(`/review/get-avg-rating/${movieId}`);

  // console.log("Movie Details:", movie);
  // console.log("Average Rating:", averageRating);

  if (isLoading) return <Skeleton />;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.poster})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
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
            <BsFillStarFill className="text-yellow-400" /> &nbsp;
            {averageRating ? `${averageRating} / 5` : `${movie?.rating} / 5`}
          </p>

          <p className="text-lg mt-2">{movie?.genre?.join(", ")}</p>
          <p className="text-lg mt-2">{movie.description}</p>
          <p className="text-gray-300 mt-2">Duration: {movie.duration} min</p>

          {/* Buttons for Edit and Delete */}
          <div className="mt-5 flex gap-4">
            <button
              className="bg-blue-600 px-6 py-2 text-white font-semibold rounded-md hover:bg-blue-700"
              onClick={() => navigate(`/theaterOwner/edit-Movie/${movieId}`)}
            >
              Edit Movie
            </button>
            <MovieDelete movieId={movieId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsTHO;
