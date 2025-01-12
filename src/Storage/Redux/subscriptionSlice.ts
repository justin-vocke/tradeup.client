import { createSlice } from "@reduxjs/toolkit";
import { SubscriptionResponse } from "../../models/subscription";

const initialState = {
  subscriptions: [] as SubscriptionResponse[],
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
});

export const subscriptionReducer = subscriptionSlice.reducer;
