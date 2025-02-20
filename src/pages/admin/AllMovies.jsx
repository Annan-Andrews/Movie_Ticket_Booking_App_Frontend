import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";
import MoviesCardAdmin from "../../components/admin/MoviesCardAdmin";

const AllMovies = () => {
  const { theaterOwnerData } = useSelector((state) => state.theaterOwner);
  const { id: ownerId } = theaterOwnerData || {};

  const [moviesResponse, isLoading, error] = useFetch("/movies/get-all-movies");

  return (
    <div>
      <section className="mb-8 text-center px-4">
        <h1 className="text-3xl font-bold text-white">All Movies</h1>
      </section>

      {isLoading ? (
        <Skeleton />
      ) : (
        <section className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
          {moviesResponse?.map((movie) => (
            <div key={movie?._id} className="w-full flex justify-center">
              <MoviesCardAdmin movie={movie} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default AllMovies;
