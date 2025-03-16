import { get } from "react-hook-form";
import apiSlice from "../common/apiSlice";

export const materialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMaterials: builder.query({
      query: () => "/material",
    }),
    getMaterial: builder.query({
      query: (id) => `/material/${id}`,
    }),
    createMaterial: builder.mutation({
      query: (data) => ({
        url: "/material",
        method: "POST",
        body: data,
      }),
    }),
    updateMaterial: builder.mutation({
      query: (data) => ({
        url: `/material/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `/material/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useGetMaterialQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialApi;