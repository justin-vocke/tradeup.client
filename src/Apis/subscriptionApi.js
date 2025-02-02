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
    editSubscription: builder.mutation({
      query: (subscription) => ({
        url: "",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      }),
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: "",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      }),
    }),
  }),
});

export const {
  useGetUserSubscriptionDataQuery,
  useAddSubscriptionMutation,
  useEditSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
export default subscriptionApi;
