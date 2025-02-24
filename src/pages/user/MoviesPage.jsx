import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import Skeleton from "../../components/shared/Skeleton";
import MovieCard from "../../components/user/MovieCard";

const MoviesPage = () => {
  const [filters, setFilters] = useState({ genre: [], language: [] });
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Fetch all movies initially
  const [movieList, isLoading, error] = useFetch("/movies/get-all-movies");

  // Handle filter selection
  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[category].push(value);
      }

      return updatedFilters;
    });
  };

  // Fetch filtered movies dynamically when filters change
  useEffect(() => {
    const fetchFilteredMovies = async () => {
      if (filters.genre.length === 0 && filters.language.length === 0) {
        setIsFiltering(false);
        return;
      }

      setIsFiltering(true);
      try {
        const queryParams = new URLSearchParams();
        if (filters.genre.length > 0) {
          queryParams.append("genre", filters.genre.join("|"));
        }
        if (filters.language.length > 0) {
          queryParams.append("language", filters.language.join("|"));
        }

        const response = await axiosInstance.get(
          `/movies/filter-movies?${queryParams.toString()}`
        );
        setFilteredMovies(response.data.data || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setFilteredMovies([]);
      }
    };

    fetchFilteredMovies();
  }, [filters]);

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Section */}
        <aside className="hidden space-y-4 lg:block">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Filters
          </h2>

          {/* Genre Filter */}
          <details className="overflow-hidden rounded-sm border border-gray-300 dark:border-gray-600">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 dark:text-gray-100">
              <span className="text-sm font-medium">Genre</span>
              <span className="transition group-open:-rotate-180"> ▼ </span>
            </summary>
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-4">
              {["Action", "Comedy", "Drama", "Thriller", "Sci-Fi"].map(
                (genre) => (
                  <label
                    key={genre}
                    className="block text-gray-900 dark:text-gray-100"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleFilterChange("genre", genre)}
                      checked={filters.genre.includes(genre)}
                    />
                    {genre}
                  </label>
                )
              )}
            </div>
          </details>

          {/* Language Filter */}
          <details className="overflow-hidden rounded-sm border border-gray-300 dark:border-gray-600">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 dark:text-gray-100">
              <span className="text-sm font-medium">Language</span>
              <span className="transition group-open:-rotate-180"> ▼ </span>
            </summary>
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-4">
              {["English", "Hindi", "Tamil", "Telugu", "Malayalam"].map(
                (language) => (
                  <label
                    key={language}
                    className="block text-gray-900 dark:text-gray-100"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleFilterChange("language", language)}
                      checked={filters.language.includes(language)}
                    />
                    {language}
                  </label>
                )
              )}
            </div>
          </details>
        </aside>

        {/* Movies Section */}
        <div className="lg:col-span-3 flex flex-col">
          <section className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Movies
            </h1>
          </section>

          {isLoading ? (
            <Skeleton />
          ) : (
            <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(isFiltering ? filteredMovies : movieList)?.length > 0 ? (
                (isFiltering ? filteredMovies : movieList).map((movie) => (
                  <div key={movie?._id} className="flex justify-center">
                    <MovieCard movie={movie} />
                  </div>
                ))
              ) : (
                <p className="text-gray-900 dark:text-gray-300 text-center w-full">
                  No movies found
                </p>
              )}
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default MoviesPage;
