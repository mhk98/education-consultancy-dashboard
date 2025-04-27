// import cartSlice from "@/Redux-Thunk/reducers/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/auth";
import { profileApi } from "../features/profile/profile";
import { applicationApi } from "../features/application/application";
import { documentApi } from "../features/document/document";
import { academicApi } from "../features/academic/academic";
import { testsApi } from "../features/tests/tests";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [academicApi.reducerPath]: academicApi.reducer,
    [testsApi.reducerPath]: testsApi.reducer,
  
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        // contactApi.middleware,
        authApi.middleware,
        profileApi.middleware,
        applicationApi.middleware,
        documentApi.middleware,
        academicApi.middleware,
        testsApi.middleware,
      
    ),
});

export default store;