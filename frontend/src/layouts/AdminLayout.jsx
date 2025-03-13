import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ThemeChanger from '../components/ThemeChanger';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="flex h-screen bg-base-100">
      <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-base-100">
          <h1 className="text-xl font-semibold text-base-content">Admin Dashboard</h1>
            <ThemeChanger />

        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-base-100 text-base-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
