import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  userData: null,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUserStart: (state) => {
      state.isLoading = true;
    },
    registerUserSuccess: (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    registerUserFailure: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
    },
    checkUserAction: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
  },
});

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  checkUserAction,
} = authSlice.actions;
export default authSlice.reducer;
