import React from "react";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";
import MovieCard from "../../components/user/MovieCard";

const MoviesPage = () => {
  const [movieList, isLoading, error] = useFetch("/movies/get-all-movies");

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Section */}
        <aside className="hidden space-y-4 lg:block">
          <h2 className="text-xl font-bold text-white">Filters</h2>
          <details className="overflow-hidden rounded-sm border border-gray-700">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-white">
              <span className="text-sm font-medium">Genre</span>
              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>
            <div className="border-t border-gray-600 bg-gray-800 p-4">
              <ul className="space-y-2">
                <li><input type="checkbox" className="mr-2" /> Action</li>
                <li><input type="checkbox" className="mr-2" /> Comedy</li>
                <li><input type="checkbox" className="mr-2" /> Drama</li>
                <li><input type="checkbox" className="mr-2" /> Thriller</li>
                <li><input type="checkbox" className="mr-2" /> Sci-Fi</li>
              </ul>
            </div>
          </details>

          <details className="overflow-hidden rounded-sm border border-gray-700">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-white">
              <span className="text-sm font-medium">Language</span>
              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>
            <div className="border-t border-gray-600 bg-gray-800 p-4">
              <ul className="space-y-2">
                <li><input type="checkbox" className="mr-2" /> English</li>
                <li><input type="checkbox" className="mr-2" /> Hindi</li>
                <li><input type="checkbox" className="mr-2" /> Tamil</li>
                <li><input type="checkbox" className="mr-2" /> Telugu</li>
                <li><input type="checkbox" className="mr-2" /> Malayalam</li>
              </ul>
            </div>
          </details>
        </aside>

        {/* Movies Section */}
        <div className="lg:col-span-3 flex flex-col">
          <section className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-white">Movies</h1>
          </section>

          {isLoading ? (
            <Skeleton />
          ) : (
            <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movieList?.map((movie) => (
                <div key={movie?._id} className="flex justify-center">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default MoviesPage;
