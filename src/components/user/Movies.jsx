import React from "react";
import MovieCard from "./MovieCard";
import Skeleton from "../shared/Skeleton";
import useFetch from "../../hooks/useFetch";

const Movies = () => {
  const [movieList, isLoading, error] = useFetch("/movies/get-all-movies");

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-10">
          <section className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-white">Movies</h1>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {movieList?.map((movie) => (
              <MovieCard key={movie?._id} movie={movie} />
            ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default Movies;
