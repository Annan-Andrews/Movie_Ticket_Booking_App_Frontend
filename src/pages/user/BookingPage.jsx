import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from "../../config/axiosInstance";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { scheduleId } = useParams();
  const { selectedSeats, totalPrice } = state || {};

  const [scheduleDetails, isScheduleLoading] = useFetch(
    `/theater/get-schedule/${scheduleId}`
  );

  console.log("Seats", selectedSeats);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_Publishable_key
      );

      const session = await axiosInstance({
        url: "/payment/create-checkout-session",
        method: "POST",
        data: {
          scheduleDetails,
          selectedSeats,
          totalPrice,
        },
      });

      console.log(session, "=======session");
      const result = await stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
    } catch (error) {
      console.log(error);
      console.error(result.error.message);
    }
  };

  if (isScheduleLoading) return <Skeleton />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white p-10">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl flex w-full max-w-4xl">
        {/* Left Side: Movie Image */}
        <div className="w-1/2 flex justify-center">
          <img
            src={scheduleDetails?.schedule.movieId.image}
            alt={scheduleDetails?.schedule.movieId.title}
            className="rounded-lg shadow-lg w-80 h-auto object-cover"
          />
        </div>

        {/* Right Side: Booking Details */}
        <div className="w-1/2 pl-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">
              {scheduleDetails?.schedule.movieId.title}
            </h1>
            <p className="text-gray-300 text-lg mb-2">
              <span className="font-semibold text-white">Theater:</span>{" "}
              {scheduleDetails?.theaterName}
            </p>
            <p className="text-gray-300 text-lg mb-2">
              <span className="font-semibold text-white">Selected Seats:</span>{" "}
              {selectedSeats.map((s) => s.seatId).join(", ")}
            </p>
            <p className="text-lg font-semibold mt-4 text-green-400">
              Total Price: ₹{totalPrice}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-6">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition text-lg shadow-md"
            >
              Back
            </button>
            <button
              onClick={makePayment}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition text-lg shadow-lg"
            >
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
