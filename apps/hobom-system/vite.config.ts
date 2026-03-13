import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["date-fns"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
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
