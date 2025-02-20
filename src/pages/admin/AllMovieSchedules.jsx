import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";

const AllMovieSchedules = () => {
  const { theaterOwnerData } = useSelector((state) => state.theaterOwner);
  const { id: ownerId } = theaterOwnerData || {};

  const [moviesSchedules, isLoading, error] = useFetch(
    "/theater/all-movie-schedules"
  );

  // Calculate booked and available seats for each schedule
  const calculateSeats = (seats) => {
    const bookedSeats = seats.filter((seat) => seat.isBooked).length;
    const availableSeats = seats.length - bookedSeats;
    return { bookedSeats, availableSeats };
  };

  console.log("Fetched Movie Schedules:", moviesSchedules);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Movie Schedules 🎬
      </h2>

      {/* Loading state */}
      {isLoading && <Skeleton />}

      {/* Error state */}
      {error && (
        <p className="text-center text-red-600 font-medium">
          ❌ Failed to fetch movie schedules. Try again later.
        </p>
      )}

      {/* Movie Schedules Table */}
      {Array.isArray(moviesSchedules) && moviesSchedules.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <thead className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
              <tr>
                <th className="py-3 px-5 text-left">🎭 Theater</th>
                <th className="py-3 px-5 text-left">🎬 Movie</th>
                <th className="py-3 px-5 text-left">📅 Show Date</th>
                <th className="py-3 px-5 text-left">⏰ Show Time</th>
                <th className="py-3 px-5 text-left">💰 Price</th>
                <th className="py-3 px-5 text-left">🎟️ Seats</th>
              </tr>
            </thead>
            <tbody>
              {moviesSchedules.map((theater) =>
                theater.movieSchedules.map((schedule, index) => {
                  const { bookedSeats, availableSeats } = calculateSeats(
                    schedule.seats
                  );
                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100 transition"
                    >
                      <td className="py-3 px-5 font-medium text-gray-700">
                        {theater.name}
                      </td>
                      <td className="py-3 px-5 font-semibold text-gray-900">
                        {schedule.movieId?.title || "No title available"}
                      </td>
                      <td className="py-3 px-5 text-gray-800">
                        {new Date(schedule.showDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-5 text-gray-800">
                        {schedule.showTime}
                      </td>
                      <td className="py-3 px-5 text-green-600 font-semibold">
                        ₹{schedule.price}
                      </td>
                      <td className="py-3 px-5 text-gray-800">
                        {bookedSeats} / {availableSeats + bookedSeats} seats
                        booked
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-500 font-medium mt-4">
            🚫 No movie schedules found.
          </p>
        )
      )}
    </div>
  );
};

export default AllMovieSchedules;
