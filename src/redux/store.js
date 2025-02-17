import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./features/userSlice";
import theaterOwnerReducer from "./features/theaterOwnerSlice";


export default configureStore({
  reducer: {
    user: userReducer,
    theaterOwner: theaterOwnerReducer,
  },
});
