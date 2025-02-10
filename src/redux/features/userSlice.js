import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isUserAuth: false,
    userData: {},
  },
  reducers: {
    saveUser: (state, action) => {
      state.isUserAuth = true;
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.isUserAuth = false;
      state.userData = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
