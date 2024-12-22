import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

import { configureStore } from "@reduxjs/toolkit";
import { algebra1Reducer } from "./algebra1slice";
import { userAuthReducer } from "./userAuthSlice";
import authApi from "../../Apis/authApi";
import algebra1Api from "../../Apis/algebra1Api";

const store = configureStore({
  reducer: {
    algebra1Store: algebra1Reducer,
    userAuthStore: userAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [algebra1Api.reducerPath]: algebra1Api.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare()
      .concat(authApi.middleware)
      .concat(algebra1Api.middleware),
});

export default store;
