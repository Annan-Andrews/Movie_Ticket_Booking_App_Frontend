import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ChangePassword from "../../components/user/ChangePassword";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/shared/Skeleton";
import useLogout from "../../hooks/useLogout";

const Profile = () => {
  const [profileData, isLoading, error] = useFetch("/user/profile");
  const navigate = useNavigate();
  const logout = useLogout();

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-[800px] bg-gray-200 rounded-xl shadow-lg overflow-hidden relative p-6">
        {/* Cover Section */}
        <div className="h-32 bg-gradient-to-r from-blue-900 to-red-500 rounded-t-xl flex items-center justify-center text-white text-xl font-semibold">
          Hi, {profileData?.name || "User"}
        </div>

        {/* Profile Picture */}
        <div className="flex justify-start pl-10 -mt-16">
          {profileData?.profilePic ? (
            <div className="avatar">
              <div className="w-24 rounded-full border-4 border-white">
                <img src={profileData.profilePic} alt="Profile" />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-24 rounded-full border-4 border-white">
                <span className="text-3xl">
                  {profileData?.name?.slice(0, 2).toUpperCase() || "U"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User Info Section */}
        <div className="p-6 ">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Personal Details
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700 font-medium">
              Name: <span className="font-normal">{profileData?.name}</span>
            </p>
            <p className="text-gray-700 font-medium mt-2">
              Mobile: <span className="font-normal">{profileData?.mobile}</span>
            </p>
            <p className="text-gray-700 font-medium mt-2">
              Email: <span className="font-normal">{profileData?.email}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-around">
          <ChangePassword />
          <button
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            onClick={() => navigate("/user/edit-profile")}
          >
            Edit Profile
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-6 flex justify-center">
          <button className="btn btn-error">
            <a onClick={logout}>Logout</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
