import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "http://223.130.163.240:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
    },
    host: "0.0.0.0",
  },
});
