import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/user/change-password",
        data: data,
      });
      console.log("response::", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Change Password
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change Password</h3>
          {/* <p className="py-4">
                Press ESC key or click the button below to close
              </p> */}
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              {/* if there is a button in form, it will close the modal */}
              <div className="form-control">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Current Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                    {...register("currentPassword")}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                  {...register("newPassword")}
                  required
                />
                {/* <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label> */}
              </div>
              <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              >
                Change Password
              </button>
              {/* <button className="btn">Close</button> */}
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ChangePassword;
