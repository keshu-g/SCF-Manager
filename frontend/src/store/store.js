import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice reducer to the store
  },
});

export default store;
