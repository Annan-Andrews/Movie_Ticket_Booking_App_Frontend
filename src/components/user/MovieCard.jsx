import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  console.log("movieCard======", movie);
  const navigate = useNavigate();

  return (
    <Link
      to={`/movieDetails/${movie?._id}`}
      className="group relative block bg-black cursor-pointer overflow-hidden rounded-lg w-[320px]"
    >
      <img
        alt=""
        src={movie?.image}
        className="absolute inset-0 size-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        {/* <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
          Developer
        </p> */}

        <p className="text-xl font-bold text-white sm:text-2xl">
          {movie?.title}
        </p>

        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white font-serif">{movie?.description}</p>
            <p className="text-lg font-medium text-white">{movie?.genre}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
