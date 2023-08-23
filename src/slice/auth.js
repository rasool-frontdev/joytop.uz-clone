import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  userData: null,
  currentUser: {},
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
    userLoggedIn: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    userSignOut: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUser = action.payload;
    },
  },
});

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  userLoggedIn,
  userSignOut,
} = authSlice.actions;
export default authSlice.reducer;
