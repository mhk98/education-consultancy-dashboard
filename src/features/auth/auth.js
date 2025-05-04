import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("token");  // You can use sessionStorage or other storage methods as well
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://education-consultancy-backend.onrender.com/api/v1/",

    // This will attach the token to every request that requires authorization
    prepareHeaders: (headers) => {
      const token = getAuthToken(); // Retrieve token from storage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Add token to headers if available
      }
      return headers;
    },
  }),
  tagTypes: ["auth"], 
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: "/user/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["auth"], 
    }),

    userRegister: build.mutation({
      query: (registerData) => ({
        url: "/user/register",
        method: "POST",
        body: registerData,
      }),
      invalidatesTags: ["auth"], 
    }),

    getAllUser: build.query({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["auth"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getUserDataById: build.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      providesTags: ["user"],
      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

  }),
});

// Export hooks to use in your components
export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useGetAllUserQuery,
  useGetUserDataByIdQuery,

} = authApi;