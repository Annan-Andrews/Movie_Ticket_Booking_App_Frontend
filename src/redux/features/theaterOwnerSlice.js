import { createSlice } from "@reduxjs/toolkit";

// Theater Owner Slice
export const theaterOwnerSlice = createSlice({
  name: "theaterOwner",
  initialState: {
    isTheaterOwnerAuth: false,
    theaterOwnerData: {},
  },
  reducers: {
    saveTheaterOwner: (state, action) => {
      console.log("Payload received in Redux:", action.payload);
      state.isTheaterOwnerAuth = true;
      state.theaterOwnerData = action.payload;
    },
    clearTheaterOwner: (state) => {
      state.isTheaterOwnerAuth = false;
      state.theaterOwnerData = {};
    },
  },
});

export const { saveTheaterOwner, clearTheaterOwner } =
  theaterOwnerSlice.actions;

export default theaterOwnerSlice.reducer;
