import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import Skeleton from "../../components/shared/Skeleton";
import TheaterDelete from "../../components/theater_Owner/TheaterDelete";

const TheaterDetails = () => {
  const { theaterId } = useParams();
  const navigate = useNavigate();
  const [theaterDetails, isLoading, error] = useFetch(
    `/theater/get-theater-details/${theaterId}`
  );


  

  if (isLoading) return <Skeleton />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">{theaterDetails?.name}</h1>

      <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-xs dark:border-gray-700">
        <dl class="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
          <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800">
            <dt class="font-semibold text-lg text-gray-900 dark:text-white">
              Location:
            </dt>
            <dd class="font-semibold text-lg text-gray-700 sm:col-span-2 dark:text-gray-200">
              {theaterDetails?.location}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800">
            <dt class="font-semibold text-lg text-gray-900 dark:text-white">
              Seats:
            </dt>
            <dd class="font-semibold text-lg text-gray-700 sm:col-span-2 dark:text-gray-200">
              {theaterDetails?.seats}
            </dd>
          </div>
        </dl>
      </div>

      {/* Movie Schedules Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">🎬 Movie Schedules</h2>
        {theaterDetails?.movieSchedules?.length > 0 ? (
          <div className="bg-gray-800 p-4 rounded-lg">
            {theaterDetails.movieSchedules.map((schedule, index) => (
              <div key={index} className="border-b border-gray-600 pb-3 mb-3">
                <p className="text-lg font-semibold">
                  🎥 {schedule.movieId?.title}
                </p>
                <p>🕒 Show Time: {schedule.showTime}</p>
                <p>
                  📅 Show Date:{" "}
                  {new Date(schedule.showDate).toLocaleDateString()}
                </p>
                <p>💲 Price: ${schedule.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No movie schedules available.</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate(`/theaterOwner/theater/${theaterId}/add-movie-schedule`)}
        >
          ➕ Add Movie Schedule
        </button>
        <TheaterDelete theaterId={theaterId} />
      </div>
    </div>
  );
};

export default TheaterDetails;
