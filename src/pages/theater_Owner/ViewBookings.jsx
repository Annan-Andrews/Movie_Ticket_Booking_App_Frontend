import { useParams } from "react-router-dom";
import Skeleton from "../../components/shared/Skeleton";
import useFetch from "../../hooks/useFetch";

const ViewBookings = () => {
  const { scheduleId } = useParams();
  const [bookings, isLoading, error] = useFetch(
    scheduleId ? `/booking/all-bookings/${scheduleId}` : null
  );

  const scheduleDetails =
    bookings?.length > 0 ? bookings[0].scheduleDetails : null;

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Skeleton />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-600 font-medium mt-4">
        ❌ Failed to fetch Bookings. Try again later.
      </p>
    );

  if (!scheduleDetails)
    return (
      <p className="text-center text-gray-400 font-medium mt-4">
        No bookings found.
      </p>
    );

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
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold text-center mb-6">Booking Details</h2>

      {/* Schedule Information */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold">
          {scheduleDetails.theaterName} -{" "}
          <span className="text-indigo-400">
            {scheduleDetails.schedule.movieId.title}
          </span>
        </h2>
        <p className="text-lg mt-2 text-gray-300">
           <strong>Show Date:</strong>{" "}
          {new Date(scheduleDetails.schedule.showDate).toLocaleDateString()} | {" "}
          <strong>Show Time:</strong> {formatTime(scheduleDetails.schedule.showTime)}
        </p>
      </div>

      {/* Booking List */}
      <h3 className="text-xl font-semibold mb-4">Confirmed Bookings</h3>
      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700"
            >
              <p className="text-lg ">
                <strong className="text-gray-300">Name:</strong>{" "}
                {booking.userId.name}
              </p>
              <p className="text-gray-300">
                <strong>Email:</strong> {booking.userId.email}
              </p>
              <p className="text-gray-300">
                <strong>Seats:</strong>{" "}
                <span className="text-green-400">
                  {booking.seats.map((seat) => seat.seatId).join(", ")}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No confirmed bookings available.</p>
      )}
    </div>
  );
};

export default ViewBookings;
