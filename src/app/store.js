// import cartSlice from "@/Redux-Thunk/reducers/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/auth";
import { profileApi } from "../features/profile/profile";
import { applicationApi } from "../features/application/application";
import { documentApi } from "../features/document/document";
import { academicApi } from "../features/academic/academic";
import { testsApi } from "../features/tests/tests";
import { studentCommentApi } from "../features/studentComment/studentComment";
import { studentReplyApi } from "../features/studentReply/studentReply";
import { additionalDocumentApi } from "../features/additionalDocument/additionalDocument";
import { programCountryApi } from "../features/programCountry/programCountry";
import { programIntakeApi } from "../features/programIntake/programIntake";
import { programUniversityApi } from "../features/programUniversity/programUniversity";
import { programNameApi } from "../features/programName/programName";
import { programYearsApi } from "../features/programYears/programYears";
import { PendingPaymentApi } from "../features/pendingPayment/pendingPayment";
import { RequestPaymentApi } from "../features/requestPayment/requestPayment";
import { CashInApi } from "../features/cashIn/cashIn";
import { CommissionApi } from "../features/commission/commission";




const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [academicApi.reducerPath]: academicApi.reducer,
    [testsApi.reducerPath]: testsApi.reducer,
    [studentCommentApi.reducerPath]: studentCommentApi.reducer,
    [studentReplyApi.reducerPath]: studentReplyApi.reducer,
    [additionalDocumentApi.reducerPath]: additionalDocumentApi.reducer,
    [programYearsApi.reducerPath]: programYearsApi.reducer,
    [programCountryApi.reducerPath]: programCountryApi.reducer,
    [programIntakeApi.reducerPath]: programIntakeApi.reducer,
    [programUniversityApi.reducerPath]: programUniversityApi.reducer,
    [programNameApi.reducerPath]: programNameApi.reducer,
    [RequestPaymentApi.reducerPath]: RequestPaymentApi.reducer,
    [PendingPaymentApi.reducerPath]: PendingPaymentApi.reducer,
    [CashInApi.reducerPath]: CashInApi.reducer,
    [CommissionApi.reducerPath]: CommissionApi.reducer,
  
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
        studentCommentApi.middleware,
        studentReplyApi.middleware,
        additionalDocumentApi.middleware,
        programCountryApi.middleware,
        programIntakeApi.middleware,
        programUniversityApi.middleware,
        programNameApi.middleware,
        programYearsApi.middleware,
        RequestPaymentApi.middleware,
        PendingPaymentApi.middleware,
        CashInApi.middleware,
        CommissionApi.middleware,
      
    ),
});

export default store;