import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

type subscription = {
  Ticker: string;
  Threshold: number;
  Position: 0 | 1;
};
const initialState = {
  subscriptions: [] as subscription[],
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
});
