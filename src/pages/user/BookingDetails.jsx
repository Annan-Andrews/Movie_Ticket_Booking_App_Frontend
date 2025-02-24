import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const [booking, isLoading, error] = useFetch(
    `/booking/booking-details/${bookingId}`
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

  if (isLoading) return <Skeleton />;
  if (error)
    return (
      <p className="text-red-500 text-center dark:text-red-400">
        Error fetching booking details
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white flex justify-center items-center p-8">
      <div className="max-w-5xl w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8">
        {/* Left Side: Movie Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={booking?.scheduleDetails?.schedule?.movieId?.image}
            alt={booking?.scheduleDetails?.schedule?.movieId?.title}
            className="w-96 h-[30rem] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Right Side: Booking Details */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-2">
            {booking?.scheduleDetails?.schedule?.movieId?.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {booking?.scheduleDetails?.theaterName}
          </p>

          <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg">
            <span className="font-semibold">Date:</span>{" "}
            {new Date(
              booking?.scheduleDetails?.schedule?.showDate
            ).toLocaleDateString()}
            {" | "}
            <span className="font-semibold">Time:</span>{" "}
            {formatTime(booking?.scheduleDetails?.schedule?.showTime)}
          </p>

          <h4 className="mt-6 text-xl font-semibold">Seats:</h4>
          <div className="flex flex-wrap gap-3">
            {booking?.seats?.map((seat) => (
              <span
                key={seat.seatId}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg"
              >
                {seat.seatId}
              </span>
            ))}
          </div>

          <p className="mt-6 text-xl">
            <span className="font-semibold">Total Price:</span> ₹
            {booking?.totalPrice}
          </p>

          <h4 className="mt-6 text-xl font-semibold">User Details:</h4>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            <span className="font-semibold">Name:</span> {booking?.userId?.name}{" "}
            <br />
            <span className="font-semibold">Email:</span>{" "}
            {booking?.userId?.email}
          </p>

          <p className="mt-6 text-xl">
            <span className="font-semibold">Status:</span>
            <span
              className={`ml-3 px-4 py-2 rounded-lg text-lg ${
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
      </div>
    </div>
  );
};

export default BookingDetails;
