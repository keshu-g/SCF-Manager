import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API configuration
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BE_BASE_URL,
  }),
  tagTypes: ["User"], // Tags for caching and invalidation
  endpoints: () => ({}), // Will be extended by feature-specific slices
});

export default apiSlice;
