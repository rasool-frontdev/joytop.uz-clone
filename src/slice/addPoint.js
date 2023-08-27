import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  isLoading: false,
  pointData: null,
};

export const addPointSlice = createSlice({
  name: "addPoint",
  initialState,
  reducers: {
    addPointStart: (state) => {
      state.isLoading = true;
    },
    addPointSuccess: (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    },
    addPointFailure: (state) => {
      state.isLoading = false;
    },
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { addPointStart, addPointSuccess, addPointFailure, setToggle } =
  addPointSlice.actions;
export default addPointSlice.reducer;
