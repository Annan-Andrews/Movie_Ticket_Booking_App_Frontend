import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import ChangePassword from "../../components/user/ChangePassword";

const Profile = () => {
  const [profileData, isLoading, error] = useFetch("/user/profile");
  

  const handleLogOut = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/logout",
      });
      navigate("")
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[800px] bg-white rounded-xl shadow-lg overflow-hidden relative p-6">
        {/* Cover Section */}
        <div className="h-32 bg-gradient-to-r from-blue-900 to-red-500 rounded-t-xl flex items-center justify-center text-white text-xl font-semibold">
          Hi, {profileData?.name || "User"}
        </div>

        {/* Profile Picture */}
        <div className="flex justify-start pl-10 -mt-16">
          {/* {profileData.profilePic ? (
            <div className="avatar">
              <div className="w-24 rounded-full border-4 border-white">
                <img src={profileData?.profilePic} alt="Profile" />
              </div>
            </div>
          ) : ( */}
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-24 rounded-full border-4 border-white">
              <span className="text-3xl">
                {profileData?.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
          {/* )} */}
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
          <button className="btn btn-primary">Edit Profile</button>
        </div>

        {/* Logout Button */}
        <div className="mt-6 flex justify-center">
          <button className="btn btn-error" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
