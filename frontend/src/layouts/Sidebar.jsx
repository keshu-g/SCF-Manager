import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Import,
  Users,
  Menu,
  LogOut,
} from "lucide-react";
import clsx from "clsx";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Products", icon: Package, path: "/products" },
  { label: "Import/Export", icon: Import, path: "/import-export" },
  { label: "Clients", icon: Users, path: "/clients" },
];

const Sidebar = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();

  return (
    <aside
      className={clsx(
        "h-screen bg-base-100 shadow-md border-r transition-all duration-300 flex flex-col justify-between",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Top section */}
      <div>
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <span className="text-lg font-bold text-primary">StockApp</span>
          )}
          <button
            className="btn btn-ghost btn-sm"
            onClick={toggleCollapse}
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="p-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-base-200",
                  collapsed && "justify-center gap-0"
                )}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t">
        <Link
          to="/login"
          className={clsx(
            "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-all",
            "text-base-content hover:bg-base-200",
            collapsed && "justify-center gap-0"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
