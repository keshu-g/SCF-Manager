import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import apiSlice from "./features/common/apiSlice"; // only import this one

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // ✅ FIXED
});

export default store;
