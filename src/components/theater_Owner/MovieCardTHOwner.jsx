import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MovieCardTHOwner = ({ movie }) => {
  console.log("movieCard Theater Owner =======", movie);
  const navigate = useNavigate();

  return (
    <Link
      to={`/theaterOwner/movieDetails/${movie?._id}`}
      className="group relative block bg-black cursor-pointer overflow-hidden rounded-lg w-[250px] z-10"
    >
      <img
        alt=""
        src={movie?.image}
        className="absolute inset-0 size-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-3 sm:p-4 lg:p-5">
        <p className="text-lg font-bold text-white sm:text-xl">
          {movie?.title}
        </p>

        <div className="mt-20 sm:mt-28 lg:mt-36">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-xs text-white font-serif">
              {movie?.description}
            </p>
            <p className="text-sm font-medium text-white">{movie?.genre}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCardTHOwner;
