import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-4-l2-backend.vercel.app/api",
  }),
  tagTypes: ["product"],
  endpoints: () => ({}),
});
