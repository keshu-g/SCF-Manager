import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Client from "../pages/Client";
import Material from "../pages/Material";
import Formula from "../pages/Formula";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute"; // Import the protected route wrapper

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
          <Route path="/material" element={<Material />} />
          <Route path="/formula" element={<Formula />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
