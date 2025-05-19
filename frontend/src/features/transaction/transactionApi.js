import apiSlice from "../common/apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/transaction",
    }),
    manufactureProduct: builder.mutation({
      query: (data) => ({
        url: "/transaction/manufacture",
        method: "POST",
        body: data,
      }),
    }),
    materialTransaction: builder.mutation({
      query: (data) => ({
        url: `/transaction/material`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useManufactureProductMutation,
  useMaterialTransactionMutation,
} = transactionApi;
