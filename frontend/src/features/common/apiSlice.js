import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants";
import { logout, setUser } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log("API Request:", args);
  console.log("API Response:", result);

  if (result.error && result.error.status === 401) {
    console.log("🔴 Unauthorized! Trying to refresh...");

    // Try refreshing the session
    const refreshResult = await baseQuery("/user/refresh", api, {
      method: "POST",
    });
    console.log("🔄 Refresh Response:", refreshResult);

    if (refreshResult.data) {
      console.log("✅ Refresh successful! Fetching user profile...");

      // Fetch user profile after refresh
      const profileResult = await baseQuery("/user/profile", api, extraOptions);
      console.log("👤 User Profile Response:", profileResult);

      if (profileResult.data) {
        api.dispatch(setUser(profileResult.data));
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      console.log("❌ Refresh failed! Logging out...");
      api.dispatch(logout());
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default apiSlice;
