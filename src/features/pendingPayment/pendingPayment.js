import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PendingPaymentApi = createApi({
  reducerPath: "PendingPaymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
  }),

  tagTypes: ["pendingPayment"], // Define the tag type
  endpoints: (build) => ({
    createPendingPayment: build.mutation({
      query: (data) => ({
        url: "/pendingPayment/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pendingPayment"],
    }),

    deletePendingPayment: build.mutation({
      query: (id) => ({
        url: `/pendingPayment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["pendingPayment"],
    }),

    updatePendingPayment: build.mutation({
      query: ({ data, id }) => ({
        url: `/pendingPayment/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["pendingPayment"],
    }),

    getAllPendingPayment: build.query({
      query: () => ({
        url: "/pendingPayment",
      }),
      providesTags: ["pendingPayment"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getDataById: build.query({
      query: (id) => ({
        url: `pendingPayment/${id}`,
      }),
      providesTags: ["pendingPayment"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
 useCreatePendingPaymentMutation,
 useDeletePendingPaymentMutation,
 useUpdatePendingPaymentMutation,
 useGetAllPendingPaymentQuery,
 useGetDataByIdQuery,
} = PendingPaymentApi;