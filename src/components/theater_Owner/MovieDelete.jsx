import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config/axiosInstance";

const MovieDelete = ({ movieId }) => {
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // First, delete movie schedules
      await axiosInstance.post(`/theater/delete-movieSchedule/${movieId}`);

      // Then, delete the movie
      await axiosInstance.post(`/movies/delete-movie/${movieId}`);
      toast.success("Movie deleted successfully!");
      navigate("/theaterOwner/view-movies");
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Failed to delete movie!");
    } finally {
      setShowToast(false);
    }
  };

  return (
    <div>
      {/* Delete Button */}
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-md"
        onClick={() => setShowToast(true)}
      >
        Delete Movie
      </button>

      {/* Toast Confirmation Popup */}
      {showToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 w-[300px] bg-white p-4 rounded-lg shadow-lg border border-gray-300 z-50">
          <h2 className="text-base font-semibold text-gray-900">
            Confirm Deletion
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Are you sure you want to delete this movie? This will also remove
            all its schedules.
          </p>
          <div className="mt-3 flex justify-end gap-3">
            <button
              className="bg-red-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-700"
              onClick={handleDelete}
            >
              Yes, Delete
            </button>

            <button
              className="bg-gray-300 text-gray-900 px-4 py-1.5 rounded-md text-sm hover:bg-gray-400"
              onClick={() => setShowToast(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDelete;
