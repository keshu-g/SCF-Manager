import React, { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components";
import { Dashboard, Material, Client, Formula, Login, NotFound } from "./pages";
import { useDispatch } from "react-redux";
import { isTokenValid } from "./utils/helper";
import { setUser, logout } from "./redux/features/userSlice";
import { useFetchProfileQuery } from "./redux/api/userApiSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { data, error, isLoading } = useFetchProfileQuery();

  useEffect(() => {
    if (data && isTokenValid(token)) {
      dispatch(setUser({ token, user: data.data }));
    } else if (error) {
      localStorage.removeItem("token");
      dispatch(logout());
    }
  }, [dispatch, data, error, token]);

  return { isAuthenticated: !!token && isTokenValid(token), isLoading };
};

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const privateRoutes = (
  <Route path="/" element={<Layout />}>
    <Route index element={<PrivateRoute element={<Dashboard />} />} />
    <Route path="/material" element={<PrivateRoute element={<Material />} />} />
    <Route path="/client" element={<PrivateRoute element={<Client />} />} />
    <Route path="/formula" element={<PrivateRoute element={<Formula />} />} />
  </Route>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        {privateRoutes}
      </Routes>
    </Router>
  );
}

export default App;
