import apiSlice from "../common/apiSlice";

export const clientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => "/client",
    }),
    getClient: builder.query({
      query: (id) => `/client/${id}`,
    }),
    createClient: builder.mutation({
      query: (data) => ({
        url: "/client",
        method: "POST",
        body: data,
      }),
    }),
    updateClient: builder.mutation({
      query: (data) => ({
        url: `/client`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/client/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
