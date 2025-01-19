import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Add the auth slice reducer to the store
  },
});

export default store;
