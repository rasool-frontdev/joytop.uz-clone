import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slice/auth";
import AddPointReducer from "../slice/addPoint";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    addPoint: AddPointReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});
