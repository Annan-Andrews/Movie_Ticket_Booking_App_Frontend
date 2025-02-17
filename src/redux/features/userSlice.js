import { createSlice } from "@reduxjs/toolkit";

// User Slice
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

// Export actions
export const { saveUser, clearUser } = userSlice.actions;

// Export reducers
export default userSlice.reducer;
