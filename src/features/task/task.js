import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TaskApi = createApi({
  reducerPath: "TaskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.eaconsultancy.info/api/v1/",
  }),

  tagTypes: ["task"], // Define the tag type
  endpoints: (build) => ({
    createTask: build.mutation({
      query: (data) => ({
        url: "/task/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["task"],
    }),

    deleteTask: build.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["task"],
    }),

    updateTask: build.mutation({
      query: ({ id, data }) => ({
        url: `/task/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["task"],
    }),

    getAllTask: build.query({
      query: ({branch, user_id, assignedTo_id}) => ({
        url: "/task",
        params: { branch, user_id, assignedTo_id }

      }),
      providesTags: ["task"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getDataById: build.query({
      query: (user_id) => ({
        url: `task/${user_id}`,
      }),
      providesTags: ["task"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
 useCreateTaskMutation,
 useGetAllTaskQuery,
 useUpdateTaskMutation,
 useDeleteTaskMutation,
 useGetDataByIdQuery
} = TaskApi;