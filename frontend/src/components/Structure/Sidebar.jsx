import React, { useEffect } from "react";
import {
  Atom,
  LogInIcon,
  PanelLeftClose,
  Pi,
  UserCog,
  LineChartIcon,
} from "lucide-react";
import { SidebarItem, Line } from "./index";
import clsx from "clsx";

const Sidebar = ({ isSidebarCollapsed, closeSidebar }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!document.getElementById("sidebar").contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeSidebar]);

  const sidebarItems = [
    { to: "/", icon: LineChartIcon, label: "Dashboard" },
    { to: "/material", icon: Atom, label: "Materials" },
    { to: "/client", icon: UserCog, label: "Clients" },
    { to: "/formula", icon: Pi, label: "Formula" },
  ];

  return (
    <aside
      id="sidebar"
      className={clsx(
        "fixed top-0 left-0 z-40 w-64 h-full transition-transform transform  bg-primary-bg dark:bg-dark-primary-bg border-r-2 border-border-color dark:border-dark-border-color",
        {
          "-translate-x-full": isSidebarCollapsed,
          "translate-x-0": !isSidebarCollapsed,
        }
      )}
      aria-label="Sidebar"
    >
      <div className="flex flex-col h-full justify-between">
        {/* Sidebar content */}
        <div className="px-2 py-5 overflow-y-auto">
          <div className="flex justify-between items-center px-2 h-8 mb-5">
            <span className="text-xl font-semibold text-primary-text dark:text-dark-primary-text">
              SCF Manager
            </span>
            <button
              onClick={closeSidebar}
              className="text-primary-text dark:text-dark-primary-text hover:bg-secondary-bg dark:hover:bg-dark-secondary-bg p-2 rounded"
              aria-label="Close Sidebar"
            >
              <PanelLeftClose />
            </button>
          </div>

          <Line />

          <nav>
            <ul className="mt-4 space-y-2 font-medium">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  onClick={closeSidebar}
                />
              ))}
            </ul>
          </nav>
        </div>

        <div className="px-2 py-2">
          <Line />
          <nav>
            <ul className="mt-3 mb-1 space-y-2 font-medium">
              <SidebarItem
                to="/login"
                icon={LogInIcon}
                label="Login"
                onClick={closeSidebar}
              />
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
