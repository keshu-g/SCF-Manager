import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import ImportExport from "../pages/ImportExport";
import AdminLayout from "../layouts/AdminLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/import-export" element={<ImportExport />} />
      </Route>
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
