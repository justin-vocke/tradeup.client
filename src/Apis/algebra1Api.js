import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const algebra1Api = createApi({
  reducerPath: "algebra1Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7100/api/",
    prepareHeaders: (headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  endpoints: (builder) => ({
    getAlgebra1Data: builder.query({
      query: () => ({
        url: "algebra1",
      }),
    }),
    submitAssessment: builder.mutation({
      query: (answerData) => ({
        url: "algebra1",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerData.answers),
      }),
    }),
  }),
});

export const { useGetAlgebra1DataQuery, useSubmitAssessmentMutation } =
  algebra1Api;
export default algebra1Api;
