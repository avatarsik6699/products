import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      enableRouteGeneration: false,
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    react(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src", "app"),
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@entities": path.resolve(__dirname, "src", "entities"),
      "@shared": path.resolve(__dirname, "src", "shared"),
    },
  },
});
