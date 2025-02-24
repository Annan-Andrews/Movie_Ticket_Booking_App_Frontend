import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ChangePassword from "../../components/user/ChangePassword";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Skeleton from "../../components/shared/Skeleton";
import ChangePasswordTHO from "../../components/theater_Owner/ChangePasswordTHO";

const TheaterOwnerProfile = () => {
  const [profileData, isLoading, error] = useFetch("/theaterOwnerAdmin/profile");
  const navigate = useNavigate();
  const logout = useLogout();

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <p className="text-center text-red-500 dark:text-red-400">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-[800px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative p-6">
        {/* Cover Section */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-red-500 dark:from-blue-900 dark:to-red-500 rounded-t-xl flex items-center justify-center text-white text-xl font-semibold">
          Hi, {profileData?.name || "User"}
        </div>

        {/* Profile Picture */}
        <div className="flex justify-start pl-10 -mt-16">
          {profileData?.profilePic ? (
            <div className="avatar">
              <div className="w-24 rounded-full border-4 border-white dark:border-gray-700">
                <img src={profileData.profilePic} alt="Profile" />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content dark:bg-gray-600 dark:text-white w-24 rounded-full border-4 border-white dark:border-gray-700">
                <span className="text-3xl">
                  {profileData?.name?.slice(0, 2).toUpperCase() || "U"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User Info Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Personal Details
          </h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Name: <span className="font-normal">{profileData?.name}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mt-2">
              Mobile: <span className="font-normal">{profileData?.mobile}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mt-2">
              Email: <span className="font-normal">{profileData?.email}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-around">
          <ChangePasswordTHO />
          <button
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            onClick={() => navigate("/theaterOwner/edit-profile")}
          >
            Edit Profile
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-6 flex justify-center">
          <button className="btn btn-error dark:bg-red-600 dark:hover:bg-red-700">
            <a onClick={logout}>Logout</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheaterOwnerProfile;
