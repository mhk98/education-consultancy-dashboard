import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const programNameApi = createApi({
  reducerPath: "programNameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://education-consultancy-backend.onrender.com/api/v1/",
  }),

  tagTypes: ["programName"], // Define the tag type
  endpoints: (build) => ({
    createprogramName: build.mutation({
      query: (data) => ({
        url: "/programName/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["programName"],
    }),

    deleteprogramName: build.mutation({
      query: (id) => ({
        url: `/programName/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["programName"],
    }),

    updateprogramName: build.mutation({
      query: ({ id, data }) => ({
        url: `/programName/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["programName"],
    }),

    getAllprogramName: build.query({
      query: () => ({
        url: "/programName",
      }),
      providesTags: ["programName"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getDataById: build.query({
      query: (id) => ({
        url: `programName/${id}`,
      }),
      providesTags: ["programName"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
 useCreateprogramNameMutation,
 useDeleteprogramNameMutation,
 useUpdateprogramNameMutation,
 useGetAllprogramNameQuery,
 useGetDataByIdQuery,
} = programNameApi;