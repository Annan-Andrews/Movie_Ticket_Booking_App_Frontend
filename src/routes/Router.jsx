import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/user/Home";
import MoviesPage from "../pages/user/MoviesPage";
import ErrorPage from "../pages/shared/ErrorPage";
import MovieDetails from "../pages/user/MovieDetails";
import Login from "../pages/shared/login";
import Signup from "../pages/shared/Signup";
import TheaterOwnerLayout from "../layout/TheaterOwnerLayout";
import Profile from "../pages/user/Profile";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about",
        // element: <About />,
      },
      {
        path: "contact",
        // element: <Contact />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "movieDetails/:movieId",
        element: <MovieDetails />,
      },
      {
        element: <ProtectedRoute />,
        errorElement: <ErrorPage role="user" />,
        path: "user",
        children: [
          {
            path: "/user",
            element: <Home role="user" />,
          },
          {
            path: "profile",
            element: <Profile role="user" />,
          },
          {
            path: "booking",
            // element: <Profile />,
          },
        ],
      },
    ],
  },

  {
    path: "theaterOwner",
    element: <TheaterOwnerLayout />,
    errorElement: <ErrorPage role="theaterOwner" />,
    children: [
      //   {
      //     path: "theaterOwner",
      //     element: <Login role="theaterOwner" />,
      //   },
      {
        path: "login",
        element: <Login role="theaterOwner" />,
      },
      {
        path: "signup",
        element: <Signup role="theaterOwner" />,
      },
      {
        path: "",
        // element: <ProtectedRouteMentor />,
        children: [
          {
            path: "dashboard",
          },
          {
            path: "profile",
            element: <h1>Theater Owner Profile page</h1>,
          },
          {
            path: "create-theater",
          },
        ],
      },
    ],
  },
  //   {
  //     path: "admin",
  //     element: <TheaterOwnerLayout />,
  //     errorElement: <ErrorPage role="admin" />,
  //     children: [
  //       {
  //         path: "login",
  //         element: <Login role="admin" />,
  //       },
  //       {
  //         path: "signup",
  //         element: <Signup role="admin" />,
  //       },
  //     ],
  //   },
]);
