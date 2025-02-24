import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/shared/Skeleton";

const AllUsers = () => {
  const { theaterOwnerData } = useSelector((state) => state.theaterOwner);
  const { id: ownerId } = theaterOwnerData || {};
  const navigate = useNavigate();

  const [UserResponse, isLoading, error] = useFetch(
    "/user/get-all-users"
  );

  if (isLoading) return <Skeleton />;
  if (error)
    return (
      <p className="text-red-500">
        {error.message || "Failed to load Users."}
      </p>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold sm:text-3xl mb-6">
        All Users
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <th className="font-bold text-white">Name</th>
              <th className="font-bold text-white">Email</th>
              <th className="font-bold text-white">Mobile</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {UserResponse?.map((user, index) => (
              <tr key={user._id}>
                {/* <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th> */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            user.profilePic ||
                            "https://via.placeholder.com/150"
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <th>
                  <button
                    // onClick={() =>
                    //   navigate(
                    //     `/theaterOwner/theaterDetails/${theaterOwner._id}`
                    //   )
                    // }
                    className="btn btn-ghost btn-sm"
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
