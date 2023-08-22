import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUserStart: (state) => {
      state.isLoading = true;
    },
    registerUserSuccess: (state) => {
      state.isLoading = false;
    },
    registerUserFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { registerUserStart, registerUserSuccess, registerUserFailure } =
  authSlice.actions;
export default authSlice.reducer;
