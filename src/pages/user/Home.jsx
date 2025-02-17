import React from "react";
import Carousel from "../../components/user/Carousel";
import Skeleton from "../../components/shared/Skeleton";
import MovieCard from "../../components/user/MovieCard";
import useFetch from "../../hooks/useFetch";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { searchResults, searchQuery } = useOutletContext(); // Get search data
  const [movieList, isLoading, error] = useFetch("/movies/get-all-movies");

  // Use search results if available, otherwise show all movies
  const moviesToShow = searchQuery?.trim() ? searchResults : movieList;

  return (
    <>
      <section className="mb-8">
        <Carousel />
      </section>

      <section className="mb-8 text-center px-4">
        <h1 className="text-3xl font-bold text-white">
          {searchQuery ? `Results for: "${searchQuery}"` : "Movies"}
        </h1>
      </section>

      {isLoading ? (
        <Skeleton />
      ) : (
        <section className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {moviesToShow.length > 0 ? (
            moviesToShow.map((movie) => (
              <div key={movie?._id} className="w-full flex justify-center">
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <p className="text-center text-white col-span-full">
              No movies found
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default Home;
