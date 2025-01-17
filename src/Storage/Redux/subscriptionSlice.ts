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
    addSubscription: (state, action) => {
      state.subscriptions.push(action.payload);
    },
  },
});
export const { setSubscriptions, addSubscription } = subscriptionSlice.actions;
export const subscriptionReducer = subscriptionSlice.reducer;
