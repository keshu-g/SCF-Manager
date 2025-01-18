import { useEffect, useState, useCallback } from "react";

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const themeMeta = document.getElementById("theme-color");
    if (themeMeta) {
      themeMeta.content = isDarkMode ? "#1b1b1d" : "#ffffff";
    }
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = (e) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return { isDarkMode, toggleTheme };
};

export default useTheme;
