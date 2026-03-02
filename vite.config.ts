import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["date-fns"],
  },
  resolve: {
    alias: {
      "@/packages/bom": path.resolve(__dirname, "packages/noname/src/index.ts"),
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
    },
  },
});
