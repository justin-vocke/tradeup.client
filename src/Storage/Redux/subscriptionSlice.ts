import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscriptions: [],
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptions: (state, action) => {
      state.subscriptions = action.payload;
    },
  },
});
export const { setSubscriptions } = subscriptionSlice.actions;
export const subscriptionReducer = subscriptionSlice.reducer;
