import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
      <Toaster
        position="top-right"
        theme="light"
        richColors
        closeButton
      />
    </ThemeProvider>
  );
};

export default App;
