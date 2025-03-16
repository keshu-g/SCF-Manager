import apiSlice from "../common/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    checkAuth: builder.query({
      query: () => "/user/profile",
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/user/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthQuery,
  useLazyCheckAuthQuery,
  useRefreshMutation,
} = authApi;
