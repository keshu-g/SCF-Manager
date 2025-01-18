import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to get Redux state
import { Layout } from "./components";
import { Material, Client, Formula, Login } from "./pages";
import store from "./store/store"; // Import your Redux store
import "./index.css";

// Private Route Component for protecting routes
const PrivateRoute = ({ element }) => {
  // Access authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If not authenticated, navigate to the login page
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

// Public Routes
const publicRoutes = <Route path="/login" element={<Login />} />;

// Private Routes wrapped in Layout
const privateRoutes = (
  <Route path="/" element={<Layout />}>
    <Route index element={<PrivateRoute element={<Material />} />} />
    <Route path="/client" element={<PrivateRoute element={<Client />} />} />
    <Route path="/formula" element={<PrivateRoute element={<Formula />} />} />
  </Route>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {publicRoutes}
      {privateRoutes}
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
