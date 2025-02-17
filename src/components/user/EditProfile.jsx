import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";

const EditProfile = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();

  const [profileData, isLoading, error] = useFetch("/user/profile");
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
      const response = await axiosInstance.post("/user/profile-edit", formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/user/profile");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border-gray-300 p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("name")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-lg border-gray-300 p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("email")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border-gray-300 p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("mobile")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full rounded-lg border-gray-300 p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
          className="w-full py-3 mt-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Save Changes
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
  );
};

export default EditProfile;
