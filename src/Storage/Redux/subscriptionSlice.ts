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
    editSubscription: (state, action) => {
      const subIndex = state.subscriptions.findIndex(
        (sub) => sub.Id == action.payload.Id
      );
      state.subscriptions[subIndex] = action.payload;
    },
    deleteSubscription: (state, action) => {
      const subIndex = state.subscriptions.findIndex(
        (sub) => sub.Id == action.payload.Id
      );
      state.subscriptions.splice(subIndex, 1);
    },
  },
});
export const {
  setSubscriptions,
  addSubscription,
  editSubscription,
  deleteSubscription,
} = subscriptionSlice.actions;
export const subscriptionReducer = subscriptionSlice.reducer;
