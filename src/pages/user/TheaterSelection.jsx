import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const TheaterSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [theaterList, isLoading, error] = useFetch(`/theater/get-theaters-by-movie/${movieId}`);

  const dates = Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day").format("YYYY-MM-DD"));

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const filteredTheaters =
    theaterList?.filter((theater) =>
      theater.movieSchedules.some(
        (schedule) => dayjs(schedule.showDate).utc().format("YYYY-MM-DD") === selectedDate
      )
    ) || [];

  const formatShowTime = (showDate, showTime) => {
    const fullDateTime = `${showDate.split("T")[0]}T${showTime}`;
    return dayjs(fullDateTime).format("hh:mm A");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Select a Theater</h1>

      {/* Date Picker */}
      <div className="mb-6">
        <Slider {...settings}>
          {dates.map((date) => (
            <div key={date} className="p-2">
              <button
                className={`px-4 py-2 rounded-lg w-full text-center ${
                  selectedDate === date ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {dayjs(date).format("ddd, MMM D")}
              </button>
            </div>
          ))}
        </Slider>
      </div>

      {/* Theater List */}
      <div className="mt-6 p-4 rounded-lg shadow-lg bg-gray-800 w-full">
        {filteredTheaters.length > 0 ? (
          <div className="space-y-6">
            {filteredTheaters.map((theater) => (
              <div key={theater._id} className="bg-gray-700 p-6 rounded-lg shadow-md flex justify-between items-center">
                {/* Theater Info */}
                <div>
                  <h2 className="text-xl font-semibold">{theater.name}</h2>
                  <p className="text-gray-400">{theater.location}</p>
                </div>
                
                {/* Showtimes */}
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-medium">Available Shows:</h3>
                  <div className="flex flex-wrap gap-2">
                    {theater.movieSchedules
                      .filter(
                        (schedule) => dayjs(schedule.showDate).utc().format("YYYY-MM-DD") === selectedDate
                      )
                      .map((schedule) => (
                        <button
                          key={schedule._id}
                          onClick={() => navigate(`/seat-selection/${schedule._id}`)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          {formatShowTime(schedule.showDate, schedule.showTime)}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No theaters available for this movie.</p>
        )}
      </div>
    </div>
  );
};

export default TheaterSelection;
