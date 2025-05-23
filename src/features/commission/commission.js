import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CommissionApi = createApi({
  reducerPath: "CommissionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://education-consultancy-backend.onrender.com/api/v1/",
  }),

  tagTypes: ["commission"], // Define the tag type
  endpoints: (build) => ({
    createCommission: build.mutation({
      query: (data) => ({
        url: "/commission/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["commission"],
    }),

    deleteCommission: build.mutation({
      query: (id) => ({
        url: `/commission/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["commission"],
    }),

    updateCommission: build.mutation({
      query: ({ id, data }) => ({
        url: `/commission/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["commission"],
    }),

    getAllCommission: build.query({
      query: () => ({
        url: "/commission",
      }),
      providesTags: ["commission"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getDataById: build.query({
      query: (id) => ({
        url: `commission/${id}`,
      }),
      providesTags: ["commission"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
useCreateCommissionMutation,
useGetAllCommissionQuery,
useUpdateCommissionMutation,
useDeleteCommissionMutation,
useGetDataByIdQuery
} = CommissionApi;