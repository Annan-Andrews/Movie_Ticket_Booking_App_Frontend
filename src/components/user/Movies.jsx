import React from "react";
import MovieCard from "./MovieCard";
import Skeleton from "../shared/Skeleton";
import useFetch from "../../hooks/useFetch";

const Movies = () => {
  const [movieList, isLoading, error] = useFetch("/movies/get-all-movies");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white">Movies</h1>
      </section>

      {isLoading ? (
        <Skeleton />
      ) : (
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movieList?.map((movie) => (
            <div key={movie?._id} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Movies;
