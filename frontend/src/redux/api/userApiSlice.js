import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /profile
    fetchProfile: builder.query({
      query: () => "/users/profile",
    }),

    // POST / - Create a new user
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users/",
        method: "POST",
        body: newUser,
      }),
    }),

    // POST /login
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/users/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const {
  useFetchProfileQuery,
  useCreateUserMutation,
  useLoginUserMutation,
} = userApiSlice;
