import React from "react";
import { Atom, LogInIcon, PanelLeftClose, Pi, UserCog, LineChartIcon } from "lucide-react";
import { SidebarItem, Line } from "./index";

const Sidebar = ({ isSidebarCollapsed, closeSidebar }) => (
  <aside
    id="sidebar"
    className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform transform ${
      isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
    } bg-primary-bg dark:bg-dark-primary-bg border-r-2 border-border-color dark:border-dark-border-color`}
    aria-label="Sidebar"
  >
    <div className="flex flex-col h-full justify-between">
      {/* Top Content */}
      <div className="px-2 py-5 overflow-y-auto">
        <div className="flex justify-between items-center px-2 h-8 mb-5">
          <span className="text-xl font-semibold text-primary-text dark:text-dark-primary-text">
            SCF Manager
          </span>
          <button
            onClick={closeSidebar}
            className="text-primary-text dark:text-dark-primary-text hover:bg-secondary-bg dark:hover:bg-dark-secondary-bg p-2 rounded"
          >
            <PanelLeftClose />
          </button>
        </div>

        <Line className="" />

        <nav>
          <ul className="mt-4 space-y-2 font-medium">
            <SidebarItem
              to="/"
              icon={LineChartIcon}
              label="Dashboard"
              onClick={closeSidebar}
            />
            <SidebarItem
              to="/material"
              icon={Atom}
              label="Materials"
              onClick={closeSidebar}
            />
            <SidebarItem
              to="/client"
              icon={UserCog}
              label="Clients"
              onClick={closeSidebar}
            />
            <SidebarItem
              to="/formula"
              icon={Pi}
              label="Formula"
              onClick={closeSidebar}
            />
          </ul>
        </nav>
      </div>

      {/* Bottom Theme Switcher */}
      <div className="px-2 py-2">
        <Line className="" />
        <nav>
          <ul className="mt-3 space-y-2 font-medium">
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

export default Sidebar;
