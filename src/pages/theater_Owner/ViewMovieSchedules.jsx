import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";
import { useNavigate } from "react-router-dom";

const ViewMovieSchedules = () => {
  const { theaterOwnerData } = useSelector((state) => state.theaterOwner);
  const { id: ownerId } = theaterOwnerData || {};
  const navigate = useNavigate();

  // Fetch movie schedules
  const [theaters, isLoading, error] = useFetch(
    ownerId ? `/theater/movie-schedules/${ownerId}` : null
  );

  const handleViewBookings = (scheduleId) => {
    navigate(`/theaterOwner/bookings/${scheduleId}`);
  };

  // Calculate booked and available seats for each schedule
  const calculateSeats = (seats) => {
    const bookedSeats = seats.filter((seat) => seat.isBooked).length;
    const availableSeats = seats.length - bookedSeats;
    return { bookedSeats, availableSeats };
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen text-gray-200">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Movie Schedules 🎬
      </h2>

      {/* Loading state */}
      {isLoading && <Skeleton />}

      {/* Error state */}
      {error && (
        <p className="text-center text-red-500 font-medium">
          ❌ Failed to fetch movie schedules. Try again later.
        </p>
      )}

      {/* Movie Schedules Table */}
      {theaters?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="py-3 px-5 text-left">🎭 Theater</th>
                <th className="py-3 px-5 text-left">🎬 Movie</th>
                <th className="py-3 px-5 text-left">📅 Show Date</th>
                <th className="py-3 px-5 text-left">⏰ Show Time</th>
                <th className="py-3 px-5 text-left">💰 Price</th>
                <th className="py-3 px-5 text-left">🎟️ Seats</th>
                <th className="py-3 px-5 text-left">🎫 Bookings</th>
              </tr>
            </thead>
            <tbody>
              {theaters.map((theater) =>
                theater.movieSchedules.map((schedule, index) => {
                  const { bookedSeats, availableSeats } = calculateSeats(
                    schedule.seats
                  );
                  return (
                    <tr
                      key={`${theater._id}-${index}`}
                      className="border-b border-gray-700 hover:bg-gray-700 transition"
                    >
                      <td className="py-3 px-5 font-medium text-gray-300">
                        {theater.name}
                      </td>
                      <td className="py-3 px-5 font-semibold text-white">
                        {schedule.movieId?.title || "No title available"}
                      </td>
                      <td className="py-3 px-5 text-gray-400">
                        {new Date(schedule.showDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-5 text-gray-400">
                        {formatTime(schedule.showTime)}
                      </td>
                      <td className="py-3 px-5 text-green-400 font-semibold">
                        ₹{schedule.price}
                      </td>
                      <td className="py-3 px-5 text-gray-300">
                        {bookedSeats} / {availableSeats + bookedSeats} seats
                        booked
                      </td>
                      <td>
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded transition duration-200 hover:bg-blue-500"
                          onClick={() => handleViewBookings(schedule._id)}
                        >
                          View Bookings
                        </button>
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

export default ViewMovieSchedules;
