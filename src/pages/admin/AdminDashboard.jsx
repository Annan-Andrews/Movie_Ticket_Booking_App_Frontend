import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";

const AdminDashboard = () => {
  const { theaterOwnerData } = useSelector((state) => state.theaterOwner);

  const [dashboardData, setDashboardData] = useState({
    totalTheaters: 0,
    totalMovies: 0,
    totalMovieSchedules: 0,
    totalUsers: 0,
    totalTheaterOwners: 0,
  });

  const [theatersResponse, isLoadingTheaters] = useFetch(
    "/theater/view-all-theaters"
  );
  const [moviesResponse, isLoadingMovies] = useFetch("/movies/get-all-movies");
  const [userResponse, isLoadingUsers] = useFetch("/user/get-all-users");
  const [theaterOwnerResponse, isLoadingOwners] = useFetch(
    "/theaterOwnerAdmin/get-all-theaterOwners"
  );

  useEffect(() => {
    if (
      theatersResponse &&
      moviesResponse &&
      userResponse &&
      theaterOwnerResponse
    ) {
      const totalMovieSchedules = theatersResponse?.reduce(
        (acc, theater) => acc + (theater.movieSchedules?.length || 0),
        0
      );

      setDashboardData({
        totalTheaters: theatersResponse.length || 0,
        totalMovies: moviesResponse.length || 0,
        totalMovieSchedules,
        totalUsers: userResponse.length || 0,
        totalTheaterOwners: theaterOwnerResponse.length || 0,
      });
    }
  }, [theatersResponse, moviesResponse, userResponse, theaterOwnerResponse]);

  if (isLoadingTheaters || isLoadingMovies || isLoadingUsers || isLoadingOwners)
    return <Skeleton />;

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
          Admin Dashboard
        </h2>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 justify-center mx-auto">
        {[
          { label: "Total Theaters", value: dashboardData.totalTheaters },
          { label: "Total Users", value: dashboardData.totalUsers },
          {
            label: "Total Theater Owners",
            value: dashboardData.totalTheaterOwners,
          },
          { label: "Total Movies", value: dashboardData.totalMovies },
          {
            label: "Total Movie Schedules",
            value: dashboardData.totalMovieSchedules,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center dark:bg-blue-700/25"
          >
            <dt className="order-last text-lg font-medium text-gray-500 dark:text-white/75">
              {label}
            </dt>
            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl dark:text-blue-50">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default AdminDashboard;
