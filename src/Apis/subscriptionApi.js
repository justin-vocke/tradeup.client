import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5001/api/v1/subscriptions/",
    prepareHeaders: (headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  endpoints: (builder) => ({
    getUserSubscriptionData: builder.query({
      query: () => ({
        url: "GetSubscriptionsForUser",
      }),
    }),
    addSubscription: builder.mutation({
      query: (subscription) => ({
        url: "",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      }),
    }),
  }),
});

export const { useGetUserSubscriptionDataQuery, useAddSubscriptionMutation } =
  subscriptionApi;
export default subscriptionApi;
