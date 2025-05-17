import apiSlice from "../common/apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useManufactureProductMutation, useMaterialTransactionMutation } =
  transactionApi;
