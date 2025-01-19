import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components";
import { Dashboard, Material, Client, Formula, Login, NotFound } from "./pages";
import "./index.css";
import { isTokenValid } from "./utils/helper";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  const isAuthenticated = Boolean(token) && isTokenValid(token);

  console.log("isAuthenticated", isAuthenticated, token);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

const publicRoutes = <Route path="/login" element={<Login />} />;

const privateRoutes = (
  <Route path="/" element={<Layout />}>
    <Route index element={<PrivateRoute element={<Dashboard />} />} />
    <Route path="/material" element={<PrivateRoute element={<Material />} />} />
    <Route path="/client" element={<PrivateRoute element={<Client />} />} />
    <Route path="/formula" element={<PrivateRoute element={<Formula />} />} />
  </Route>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {publicRoutes}
      {privateRoutes}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
