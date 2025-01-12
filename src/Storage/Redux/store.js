import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

import { configureStore } from "@reduxjs/toolkit";
import { subscriptionReducer } from "./subscriptionSlice";
import { userAuthReducer } from "./userAuthSlice";
import authApi from "../../Apis/authApi";
import subscriptionApi from "../../Apis/subscriptionApi";

const store = configureStore({
  reducer: {
    subscriptionStore: subscriptionReducer,
    userAuthStore: userAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare()
      .concat(authApi.middleware)
      .concat(subscriptionApi.middleware),
});

export default store;
