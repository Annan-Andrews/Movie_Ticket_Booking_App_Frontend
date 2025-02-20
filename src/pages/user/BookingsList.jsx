import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";

const BookingsList = () => {
  const [bookings, isLoading, error] = useFetch("/booking/user-bookings");
  const navigate = useNavigate();

  if (isLoading) return <Skeleton />;
  if (error)
    return <p className="text-red-500 text-center">Error fetching bookings</p>;

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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Your Bookings</h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {bookings?.map((booking) => (
          <div
            key={booking._id}
            className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition"
            onClick={() => navigate(`/user/booking-details/${booking._id}`)}
          >
            <h3 className="text-lg font-semibold">
              {booking.scheduleDetails.theaterName}
            </h3>
            <p className="text-gray-300">
              {booking.scheduleDetails.schedule.movieId.title}
            </p>
            <p className="text-gray-400 text-sm">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(
                booking.scheduleDetails.schedule.showDate
              ).toLocaleDateString()}
              {" | "}
              <span className="font-semibold">Time:</span>{" "}
              {formatTime(booking.scheduleDetails.schedule.showTime)}
            </p>
            <p className="mt-4 text-lg">
              <span className="font-semibold">Status:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-md ${
                  booking?.bookingStatus === "Confirmed"
                    ? "bg-green-600"
                    : booking?.bookingStatus === "Cancelled"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {booking?.bookingStatus}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsList;
