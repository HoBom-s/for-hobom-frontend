import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import stylex from "@stylexjs/unplugin";

export default defineConfig({
  // StyleX must run before react to preserve Fast Refresh. `unstable_moduleResolution`
  // in ESM mode lets the plugin resolve StyleX vars imported from the workspace
  // design-system package.
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      unstable_moduleResolution: { type: "commonJS", rootDir: path.resolve(__dirname, "../..") },
    }),
    react(),
  ],
  optimizeDeps: {
    include: ["date-fns", "react-hook-form"],
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
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://hobom-system.com/hobom-api-gateway/hobom-system-backend",
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
