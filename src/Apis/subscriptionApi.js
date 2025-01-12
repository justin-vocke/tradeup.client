import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5001/api/",
    prepareHeaders: (headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  endpoints: (builder) => ({
    getSubscriptionData: builder.query({
      query: () => ({
        url: "subscription",
      }),
    }),
    submitAssessment: builder.mutation({
      query: (answerData) => ({
        url: "subscription",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerData.answers),
      }),
    }),
  }),
});

export const { useGetSubscriptionDataQuery, useSubmitAssessmentMutation } =
  subscriptionApi;
export default subscriptionApi;
