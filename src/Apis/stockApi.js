import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5001/api/v1/stocks/",
    prepareHeaders: (headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  endpoints: (builder) => ({
    getStockData: builder.query({
      query: (stockSymbol) => ({
        url: `GetStockInfo?ticker=${encodeURIComponent(stockSymbol)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetStockDataQuery } = stockApi;
export default stockApi;
