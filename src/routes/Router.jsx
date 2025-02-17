import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/user/Home";
import MoviesPage from "../pages/user/MoviesPage";
import ErrorPage from "../pages/shared/ErrorPage";
import MovieDetails from "../pages/user/MovieDetails";
import Login from "../pages/shared/Login";
import Signup from "../pages/shared/Signup";
import TheaterOwnerLayout from "../layout/TheaterOwnerLayout";
import Profile from "../pages/user/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import TheaterSelection from "../pages/user/TheaterSelection";
import CreateTheater from "../pages/theater_Owner/CreateTheater";
import ProtectedRouteTheaterOwner from "./ProtectedRouteTheaterOwner";
import TheaterOwnerDashboard from "../pages/theater_Owner/TheaterOwnerDashboard";
import ViewTheaters from "../pages/theater_Owner/ViewTheaters";
import TheaterDetails from "../pages/theater_Owner/TheaterDetails";
import EditTheater from "../pages/theater_Owner/EditTheater";
import CreateMovie from "../pages/theater_Owner/CreateMovie";
import ViewMovies from "../pages/theater_Owner/ViewMovies";
import MovieDetailsTHO from "../pages/theater_Owner/MovieDetailsTHO";
import EditMovie from "../pages/theater_Owner/EditMovie";
import ViewMovieSchedules from "../pages/theater_Owner/ViewMovieSchedules";
import AddMovieScheduleForm from "../pages/theater_Owner/AddMovieScheduleForm";
import EditProfile from "../components/user/EditProfile";

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
        element: <h1>About</h1>,
        // element: <About />,
      },
      {
        path: "contact",
        element: <h1>Contact</h1>,
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
        path: "theaterSelection/:movieId",
        element: <TheaterSelection />,
      },
      {
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
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
            path: "edit-profile",
            element: <EditProfile role="user" />,
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
        element: <ProtectedRouteTheaterOwner />,
        children: [
          {
            path: "dashboard",
            element: <TheaterOwnerDashboard />,
          },
          {
            path: "profile",
            element: <h1>Theater Owner Profile page</h1>,
          },
          {
            path: "create-theater",
            element: <CreateTheater />,
          },
          {
            path: "view-theaters",
            element: <ViewTheaters />,
          },
          {
            path: "theaterDetails/:theaterId",
            element: <TheaterDetails />,
          },
          {
            path: "edit-Theater/:theaterId",
            element: <EditTheater />,
          },
          {
            path: "theater/:theaterId/add-movie-schedule",
            element: <AddMovieScheduleForm />,
          },
          {
            path: "create-movie",
            element: <CreateMovie />,
          },
          {
            path: "view-movies",
            element: <ViewMovies />,
          },
          {
            path: "movieDetails/:movieId",
            element: <MovieDetailsTHO />,
          },
          {
            path: "edit-Movie/:movieId",
            element: <EditMovie />,
          },
          {
            path: "view-MovieSchedules",
            element: <ViewMovieSchedules />,
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
