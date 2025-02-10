import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = ({ role }) => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  const user = {
    home_route: "",
};

if (role == "user") {
  user.home_route = "/user";
}

if (role == "theaterOwner") {
  user.home_route = "/theaterOwner";
}

  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>
        <p className="mt-4 text-gray-500">
          <i>{error.statusText || error.message}</i>
        </p>

        <p className="mt-4 text-gray-500">We can't find that page.</p>

        <button
          onClick={() => navigate(user.home_route)}
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-3 focus:outline-none"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
