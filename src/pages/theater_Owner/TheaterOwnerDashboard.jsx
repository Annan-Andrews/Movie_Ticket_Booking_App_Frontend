import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";

const TheaterOwnerDashboard = () => {
  const { theaterOwnerData } = useSelector((state) => state.theaterOwner);
  const { id: ownerId } = theaterOwnerData || {};

  const [dashboardData, setDashboardData] = useState({
    totalTheaters: 0,
    totalMovies: 0,
    totalMovieSchedules: 0,
    totalRevenue: 0,
  });

  const [theatersResponse, isLoading, error] = useFetch(
    ownerId ? `/theater/view-theater/${ownerId}` : null
  );

  const [moviesResponse] = useFetch(
    ownerId ? `/movies/view-movies/${ownerId}` : null
  );

  useEffect(() => {
    if (theatersResponse || moviesResponse) {
      const totalMovieSchedules = theatersResponse.reduce(
        (acc, theater) => acc + (theater.movieSchedules?.length || 0),
        0
      );

      setDashboardData({
        totalTheaters: theatersResponse.length,
        totalMovies: moviesResponse.length,
        totalMovieSchedules,
        totalRevenue: 0, // Placeholder for revenue calculation
      });
    }
  }, [theatersResponse]);

  // if (!theatersResponse) return <p>No data found</p>
  if (isLoading) return <Skeleton />;
  if (error)
    return (
      <p className="text-red-500">
        {error.message || "Failed to load dashboard data."}
      </p>
    );

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
          Theater Owner Dashboard
        </h2>
      </div>

      {/* Centering the grid */}
      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 justify-center mx-auto">
        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center dark:bg-blue-700/25">
          <dt className="order-last text-lg font-medium text-gray-500 dark:text-white/75">
            Total Theaters
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl dark:text-blue-50">
            {dashboardData.totalTheaters}
          </dd>
        </div>

        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center dark:bg-blue-700/25">
          <dt className="order-last text-lg font-medium text-gray-500 dark:text-white/75">
            Total Movies
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl dark:text-blue-50">
            {dashboardData.totalMovies}
          </dd>
        </div>

        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center dark:bg-blue-700/25">
          <dt className="order-last text-lg font-medium text-gray-500 dark:text-white/75">
            Total Movies Schedules
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl dark:text-blue-50">
            {dashboardData.totalMovieSchedules}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default TheaterOwnerDashboard;
