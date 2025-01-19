import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components";
import { Material, Client, Formula, Login } from "./pages";
import "./index.css";

const PrivateRoute = ({ element }) => {
  // const { isAuthenticated } = useSelector((state) => state.auth);
  let isAuthenticated = false;

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const publicRoutes = <Route path="/login" element={<Login />} />;

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
