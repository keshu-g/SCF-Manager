import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PanelLeftOpen } from "lucide-react";
// import Sidebar from "./Sidebar";
// import ThemeSwitcher from "./ThemeSwitcher";
import { Sidebar, ThemeSwitcher } from "./index";

const Layout = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed((prevState) => !prevState);
  const closeSidebar = () => setSidebarCollapsed(true);
  const toggleTheme = () => {
    setDarkMode((prevState) => !prevState);
    document.documentElement.classList.toggle("dark");
  };

  const location = useLocation();
  const getPageName = () => {
    let pageNames = {
      "/": "Dashboard",
      "/material": "Materials",
      "/client": "Clients",
      "/formula": "Formula",
      "/user": "Users",
    }

    return pageNames[location.pathname] || "??????";
  };

  // useEffect(() => {
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)"
  //   ).matches;
  //   setDarkMode(prefersDark);
  //   document.documentElement.classListd.toggle("dark", prefersDark);
  // }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        closeSidebar={closeSidebar}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text  border-b-2 border-border-color dark:border-dark-border-color">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              aria-controls="sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm rounded-lg hover:bg-secondary-bg dark:hover:bg-dark-secondary-bg focus:outline-none focus:ring-2 focus:ring-border-color dark:focus:ring-dark-border-color"
            >
              <span className="sr-only">Toggle Sidebar</span>
              <PanelLeftOpen />
            </button>

            {/* Current Page Name */}
            <h1 className="ml-4 text-xl font-semibold">{getPageName()}</h1>
          </div>

          {/* Theme Toggle */}
          <ThemeSwitcher toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </header>

        {/* Main Content */}
        <main className="overflow-y-auto w-screen scrollbar-custom">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
