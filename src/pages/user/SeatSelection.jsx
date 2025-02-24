import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";

const SeatSelection = () => {
  const { scheduleId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const ticketPrice = 150;
  const navigate = useNavigate();

  const [scheduleDetails, isScheduleLoading] = useFetch(
    `/theater/get-schedule/${scheduleId}`
  );

  const handleProceedToBooking = () => {
    navigate(`/user/booking/${scheduleId}`, {
      state: {
        selectedSeats,
        totalPrice: selectedSeats.length * ticketPrice,
      },
    });
  };

  const handleSeatSelect = (seat) => {
    if (seat.isBooked) return;

    setSelectedSeats((prev) => {
      if (prev.some((s) => s.seatId === seat.seatId)) {
        return prev.filter((s) => s.seatId !== seat.seatId);
      } else {
        return [...prev, seat];
      }
    });
  };

  if (isScheduleLoading) return <Skeleton />;

  const getSeatStyle = (seat) => {
    if (seat.isBooked) return "bg-red-600 cursor-not-allowed";
    if (selectedSeats.some((s) => s.seatId === seat.seatId))
      return "bg-yellow-500 hover:bg-yellow-600";
    return "bg-green-600 hover:bg-green-700 cursor-pointer";
  };

  const seatRows = {};
  scheduleDetails?.schedule.seats.forEach((seat) => {
    const rowLabel = seat.seatId.charAt(0);
    if (!seatRows[rowLabel]) seatRows[rowLabel] = [];
    seatRows[rowLabel].push(seat);
  });

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black dark:bg-gray-900 dark:text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-4">
        {scheduleDetails?.schedule.movieId.title || "Movie Name"}
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          {scheduleDetails?.theaterName}
        </h2>
        <h2 className="text-xl font-semibold">Ticket Price: {ticketPrice}</h2>
      </div>

      <div className="w-full text-center text-gray-700 dark:text-gray-300 text-lg border-b-4 border-gray-500 pb-2 mb-6">
        SCREEN
      </div>

      <div className="space-y-4">
        {Object.keys(seatRows).map((rowLabel) => {
          const seats = seatRows[rowLabel];
          const leftSeats = seats.slice(0, 10);
          const rightSeats = seats.slice(10);

          return (
            <div
              key={rowLabel}
              className="flex justify-center items-center space-x-12"
            >
              <div className="grid grid-cols-10 gap-2">
                {leftSeats.map((seat) => (
                  <button
                    key={seat.seatId}
                    className={`text-white p-3 w-10 h-10 rounded-md flex items-center justify-center ${getSeatStyle(
                      seat
                    )}`}
                    onClick={() => handleSeatSelect(seat)}
                    disabled={seat.isBooked}
                  >
                    {seat.seatId}
                  </button>
                ))}
              </div>

              <div className="w-16"></div>

              <div className="grid grid-cols-10 gap-2">
                {rightSeats.map((seat) => (
                  <button
                    key={seat.seatId}
                    className={`text-white p-3 w-10 h-10 rounded-md flex items-center justify-center ${getSeatStyle(
                      seat
                    )}`}
                    onClick={() => handleSeatSelect(seat)}
                    disabled={seat.isBooked}
                  >
                    {seat.seatId}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedSeats.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 p-3">
          <div className="rounded-lg bg-gray-300 text-black dark:bg-gray-800 dark:text-white px-6 py-3 shadow-2xl text-center animate-fade-up max-w-md mx-auto">
            <p className="text-lg font-semibold">
              Selected Seats: {selectedSeats.map((s) => s.seatId).join(", ")} |
              Total Price: ₹{selectedSeats.length * ticketPrice}
            </p>
            <button
              onClick={handleProceedToBooking}
              className="mt-3 bg-blue-500 dark:bg-indigo-500 px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-indigo-600 transition-all shadow-md"
            >
              Buy Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;