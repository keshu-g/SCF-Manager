import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Client from "../pages/Client";
import Material from "../pages/Material";
import Products from "@/pages/Products";
import AddProduct from "@/pages/AddProduct";
import Transaction from "../pages/Transaction";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute"; // Import the protected route wrapper
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

const AppRoutes = () => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("isAuthenticated", isAuthenticated);
  //   if (!isAuthenticated) {
  //     console.log("Redirecting to login");
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
          <Route path="/client/:clientId/product" element={<Products />} />
          <Route
            path="/client/:clientId/product/add"
            element={<AddProduct />}
          />
          <Route
            path="/client/:clientId/product/:productId/edit"
            element={<AddProduct />}
          />
          <Route path="/material" element={<Material />} />
          <Route path="/transaction" element={<Transaction />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
