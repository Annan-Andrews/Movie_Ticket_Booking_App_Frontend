import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";

const EditTheaterOwnerProfile = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();

  const [profileData, isLoading, error] = useFetch("/theaterOwnerAdmin/profile");
  const [profilePreview, setProfilePreview] = useState(null);

  useEffect(() => {
    if (profileData) {
      setValue("name", profileData.name);
      setValue("email", profileData.email);
      setValue("mobile", profileData.mobile);
      setProfilePreview(profileData.profilePic);
    }
  }, [profileData, setValue]);

  const profilePicFile = watch("profilePic");

  useEffect(() => {
    if (profilePicFile && profilePicFile[0]) {
      setProfilePreview(URL.createObjectURL(profilePicFile[0]));
    }
  }, [profilePicFile]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    if (data.profilePic?.[0]) formData.append("profilePic", data.profilePic[0]);

    try {
      const response = await axiosInstance.post("/theaterOwnerAdmin/profile-edit", formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/theaterOwner/profile");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-8 max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("name")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("email")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("mobile")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("profilePic")}
          />
          {profilePreview && (
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="mt-2 w-32 h-32 rounded-full object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-4 bg-indigo-600 dark:bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Save Changes
        </button>
      </form>
      {error && <p className="text-red-500 dark:text-red-400 mt-2">Error: {error}</p>}
    </div>
  );
};

export default EditTheaterOwnerProfile;