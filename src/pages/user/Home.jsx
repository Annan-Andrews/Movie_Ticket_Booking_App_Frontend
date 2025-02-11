import React from "react";
import Carousel from "../../components/user/Carousel";
import Skeleton from "../../components/shared/Skeleton";
import MovieCard from "../../components/user/MovieCard";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const [movieList, isLoading, error] = useFetch("/movies/get-all-movies");

  return (
    <>
      <section className="mb-8">
        <Carousel />
      </section>

      <section className="mb-8 text-center px-4">
        <h1 className="text-3xl font-bold text-white">Movies</h1>
      </section>

      {isLoading ? (
        <Skeleton />
      ) : (
        <section className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movieList?.map((movie) => (
            <div key={movie?._id} className="w-full flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default Home;
