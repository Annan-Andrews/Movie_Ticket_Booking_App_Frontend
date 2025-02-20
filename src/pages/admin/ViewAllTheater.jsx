import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";

const ViewAllTheaters = () => {
  const { theaterOwnerData } = useSelector((state) => state.theaterOwner);
  const { id: ownerId } = theaterOwnerData || {};
  const navigate = useNavigate();

  const [theatersResponse, isLoading, error] = useFetch(
    "/theater/view-all-theaters"
  );

  if (isLoading) return <Skeleton />;
  if (error)
    return (
      <p className="text-red-500">
        {error.message || "Failed to load theaters."}
      </p>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold sm:text-3xl mb-6">All Theaters</h1>

      {theatersResponse?.length === 0 ? (
        <p className="text-lg text-gray-400">No theaters found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Theater Name</th>
                <th className="py-2 px-4 text-left">Theater Owner Name</th>
                <th className="py-2 px-4 text-left">Location</th>
                {/* <th className="py-2 px-4 text-left"></th> Blank Space */}
              </tr>
            </thead>
            <tbody>
              {theatersResponse?.map((theater, index) => (
                <tr key={theater._id} className="border-b border-gray-600">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{theater.name}</td>
                  <td className="py-2 px-4">{theater.ownerId.name}</td>
                  <td className="py-2 px-4">{theater.location}</td>
                  {/* <td className="py-2 px-4">
                    <button
                      onClick={() =>
                        navigate(`/theaterOwner/theaterDetails/${theater._id}`)
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      View Details
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewAllTheaters;
