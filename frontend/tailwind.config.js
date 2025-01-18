// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", ...fontFamily.sans]
      },
      colors: {
        // Light Theme Colors
        "primary-bg": "#ffffff", // Crisp white
        "primary-text": "#1e1e20", // Rich dark gray for text
        "secondary-bg": "#e9eff5", // Soft blue-gray for hover highlight
        "accent-color": "#E91E63", // Vibrant modern blue
        "header-bg": "#f4f5f6", // Light gray for headers
        "link-color": "#0056cc", // Deep blue for links
        "border-color": "#d4d4d6", // Neutral gray for visible but subtle borders

        // Dark Mode Colors
        "dark-primary-bg": "#1b1b1d", // Softer black with a hint of gray
        "dark-primary-text": "#e4e4e6", // Light gray for readability
        "dark-secondary-bg": "#32383e", // Muted dark gray for hover highlight
        "dark-accent-color": "#E91E63", // Softer blue for dark mode
        "dark-header-bg": "#2a2a2d", // Slightly lighter gray for headers
        "dark-link-color": "#5ba9f7", // Bright blue for links
        "dark-border-color": "#5F5F60", // Medium gray for borders
      },
      // Adding a simple transition for theme changes
      transitionProperty: {
        background: "background-color",
        color: "color",
      },
    },
  },
  darkMode: "class", // Enables class-based dark mode
  plugins: [],
};
