import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stockList: [],
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addStock: (state, action) => {
      state.stockList.push(action.payload);
    },
  },
});
export const { addStock } = stockSlice.actions;
export const stockReducer = stockSlice.reducer;
