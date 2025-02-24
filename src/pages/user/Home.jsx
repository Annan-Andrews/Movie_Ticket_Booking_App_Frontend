import React, { useEffect, useState } from "react";
import Carousel from "../../components/user/Carousel";
import Skeleton from "../../components/shared/Skeleton";
import MovieCard from "../../components/user/MovieCard";
import useFetch from "../../hooks/useFetch";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const context = useOutletContext(); // Get the entire context
  console.log("Received context in Home:", context);

  const { searchResults = [], searchQuery = "" } = context || {};
  const [movieList, isLoading, error] = useFetch("/movies/get-all-movies");

  const [moviesToShow, setMoviesToShow] = useState(movieList);

  // Update moviesToShow whenever searchResults or movieList changes
  useEffect(() => {
    if (searchQuery?.trim()) {
      setMoviesToShow(searchResults);
    } else {
      setMoviesToShow(movieList);
    }
  }, [searchResults, searchQuery, movieList]);

  useEffect(() => {
    console.log("Updated searchResults in Home:", searchResults);
    console.log("Updated searchQuery in Home:", searchQuery);
  }, [searchResults, searchQuery]);
  console.log("Updated moviesToShow:", moviesToShow);

  return (
    <>
      <section className="mb-8">
        <Carousel />
      </section>

      <section className="mb-8 text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {searchQuery ? `Results for: "${searchQuery}"` : "Movies"}
        </h1>
      </section>

      {isLoading ? (
        <Skeleton />
      ) : (
        <section className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {moviesToShow?.length > 0 ? (
            moviesToShow.map((movie) => (
              <div key={movie?._id} className="w-full flex justify-center">
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300 col-span-full">
              No movies found
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default Home;
