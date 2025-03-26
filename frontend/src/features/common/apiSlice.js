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
    console.log("🔴 Unauthorized! Attempting token refresh...");

    console.log("🔄 Refreshing session...", api);
    const refreshResult = await baseQuery(
      { url: "/user/refresh", method: "POST" },
      api,
      extraOptions
    );

    console.log("🔄 Refresh Response:", refreshResult);

    if (refreshResult.data) {
      console.log("✅ Refresh successful! Fetching updated user profile...");

      const profileResult = await baseQuery(
        { url: "/user/profile", method: "GET" },
        api,
        extraOptions
      );

      console.log("👤 User Profile Response:", profileResult);

      if (profileResult.data) {
        api.dispatch(setUser(profileResult.data));
        // Retry the original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("⚠️ Profile fetch failed! Logging out...");
        api.dispatch(logout());
        window.location.href = "/login";
      }
    } else {
      console.error("❌ Refresh failed! Logging out...");
      api.dispatch(logout());
      window.location.href = "/login";
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
