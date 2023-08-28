import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resorts: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const resortslice = createSlice({
  name: "resort",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.resorts.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.resorts.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.resorts.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.resorts.find((item) => item.id === id);

      if (existingItem) {
        state.resorts = state.resorts.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.resorts.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
  },
});

export const resortActions = resortslice.actions;
export default resortslice.reducer;
