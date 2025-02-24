import { useSearchParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return <p className="text-center text-red-500 dark:text-red-400">Invalid session ID</p>;
  }

  const [bookingDetails, isLoading, error] = useFetch(
    `/payment/success?session_id=${sessionId}`
  );

  if (isLoading) return <Skeleton />;
  if (error)
    return (
      <p className="text-center text-red-500 dark:text-red-400">
        Error fetching booking details
      </p>
    );

  const { movie, schedule, selectedSeats, transactionId } =
    bookingDetails || {};

  const formattedDate = schedule?.date
    ? new Date(schedule.date).toLocaleDateString("en-GB")
    : "N/A";

  const formattedTime = schedule?.time
    ? new Date(`1970-01-01T${schedule.time}`).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "N/A";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-5xl w-full flex flex-col md:flex-row gap-8 text-gray-900 dark:text-white">
        {movie && (
          <div className="md:w-1/3">
            <img
              src={movie.image}
              alt={movie.title}
              className="rounded-lg w-full object-cover shadow-lg"
            />
          </div>
        )}

        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-green-600 dark:text-green-400">
            Payment Successful!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Your booking has been confirmed.
          </p>
          <h3 className="text-2xl font-bold mt-4">{movie?.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Show Date:
            </span>{" "}
            {formattedDate}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Show Time:
            </span>{" "}
            {formattedTime}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Seats:
            </span>{" "}
            {selectedSeats?.join(", ")}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Transaction ID:
            </span>{" "}
            <span className="font-mono text-blue-600 dark:text-blue-400">
              {transactionId}
            </span>
          </p>
          <button
            className="mt-6 px-5 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 w-full md:w-auto shadow-md"
            onClick={() => navigate("/user")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
