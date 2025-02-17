import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRouteTheaterOwner = () => {
  const { isTheaterOwnerAuth, theaterOwnerData } = useSelector(
    (state) => state.theaterOwner
  );
  console.log("isTheaterOwnerAuth=====", isTheaterOwnerAuth);
  // loading

  const navigate = useNavigate();

  // useEffect(() => {
  if (!isTheaterOwnerAuth) {
    navigate("/theaterOwner/login");
    return;
  }
  // }, []);

  return <Outlet />;
};

export default ProtectedRouteTheaterOwner;
