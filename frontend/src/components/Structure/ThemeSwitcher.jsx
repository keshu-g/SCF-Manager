import React from "react";
import { Sun, Moon } from "lucide-react";
import useTheme from "../../hooks/useTheme";

const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-pressed={isDarkMode}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      className="flex items-center p-2 rounded-lg text-primary-text dark:text-dark-primary-text hover:bg-secondary-bg dark:hover:bg-dark-secondary-bg transition-colors"
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeSwitcher;
