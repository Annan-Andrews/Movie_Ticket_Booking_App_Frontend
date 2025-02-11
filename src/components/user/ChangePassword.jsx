import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast, Bounce } from "react-toastify";


const ChangePassword = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data);
      const response = await axiosInstance({
        method: "POST",
        url: "/user/change-password",
        data: data,
      });
      
      console.log("Password change response:", response);
      if (response.status === 200) {
        toast.success("Password changed successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        document.getElementById("my_modal_1").close();
      } else {
        toast.error("Failed to change password. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error changing password:", error.response?.data || error);
      toast.error(error.response?.data?.message || "An error occurred.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Change Password
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box p-6 rounded-lg shadow-xl bg-white">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Change Password</h3>

          <form method="dialog" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="mt-1 block w-full rounded-lg border-gray-300 p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("currentPassword")}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="mt-1 block w-full rounded-lg border-gray-300 p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("newPassword")}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
            >
              Change Password
            </button>
          </form>
        </div>
      </dialog>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default ChangePassword;
