import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["date-fns", "zod", "react-hook-form"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/react-router") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "framework";
          }
          if (
            (id.includes("/node_modules/@mui/") &&
              !id.includes("/node_modules/@mui/x-")) ||
            id.includes("/node_modules/@emotion/")
          ) {
            return "mui";
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target:
          "https://hobom-system.com/hobom-api-gateway/hobom-system-backend",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
      "/space-api": {
        target: "https://hobom-system.com/hobom-api-gateway/hobom-space",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/space-api/, ""),
      },
      "/internal-api": {
        target: "https://hobom-system.com/hobom-api-gateway/hobom-internal",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/internal-api/, ""),
      },
    },
  },
});
