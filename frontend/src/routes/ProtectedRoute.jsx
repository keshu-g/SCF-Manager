import { Navigate, Outlet } from "react-router-dom";
import {
  useLazyCheckAuthQuery,
  useRefreshMutation,
} from "../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/loading-screen";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  const [checkAuth] = useLazyCheckAuthQuery();
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Step 1: Try getting user profile
        const profileRes = await checkAuth().unwrap();
        dispatch(setUser(profileRes));
      } catch (err) {
        if (err?.status === 401) {
          try {
            // Step 2: If 401, try refreshing the session
            await refresh().unwrap();

            // Step 3: Retry getting user profile
            const profileRes = await checkAuth().unwrap();
            dispatch(setUser(profileRes));
          } catch (refreshErr) {
            // Step 4: If refresh also fails, logout user
            dispatch(logout());
            return;
          }
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, [dispatch, checkAuth, refresh]);

  if (isLoading) return <LoadingScreen />;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
