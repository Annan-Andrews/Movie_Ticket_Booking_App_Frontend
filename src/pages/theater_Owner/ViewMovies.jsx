import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";
import MovieCardTHOwner from "../../components/theater_Owner/MovieCardTHOwner";

const ViewMovies = () => {
  const { theaterOwnerData } = useSelector((state) => state.theaterOwner);
  const { id: ownerId } = theaterOwnerData || {};

  const [moviesResponse, isLoading, error] = useFetch(
    ownerId ? `/movies/view-movies/${ownerId}` : null
  );


  return (
    <div>
      <section className="mb-8 text-center px-4">
        <h1 className="text-3xl font-bold text-white">Created Movies</h1>
      </section>

      {error && (
        <p className="text-center text-red-600 font-medium">
          ❌ {error || "Failed to load movies."}
        </p>
      )}

      {isLoading ? (
        <Skeleton />
      ) : (
        <section className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
          {moviesResponse?.map((movie) => (
            <div key={movie?._id} className="w-full flex justify-center">
              <MovieCardTHOwner movie={movie} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ViewMovies;
