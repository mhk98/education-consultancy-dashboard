// import cartSlice from "@/Redux-Thunk/reducers/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/auth";
import { profileApi } from "../features/profile/profile";
import { applicationApi } from "../features/application/application";
import { documentApi } from "../features/document/document";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
  
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        // contactApi.middleware,
        authApi.middleware,
        profileApi.middleware,
        applicationApi.middleware,
        documentApi.middleware,
      
    ),
});

export default store;