import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const NotificationApi = createApi({
  reducerPath: "NotificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.eaconsultancy.info/api/v1/",
  }),

  tagTypes: ["notification"], // Define the tag type
  endpoints: (build) => ({
    createNotification: build.mutation({
      query: (data) => ({
        url: "/notification/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),

    markNotificationRead: build.mutation({
      query: (id, userId) => ({
        url: `/profile/${id}/read`,
        method: "PUT",
        body: userId,
      }),
      invalidatesTags: ["profile"],
    }),

    getDataById: build.query({
      query: ({ branch, userId }) => ({
        url: `notification/${branch}/${userId}`,
      }),
      providesTags: ["notification"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useMarkNotificationReadQuery,
  useGetDataByIdQuery,
} = NotificationApi;
