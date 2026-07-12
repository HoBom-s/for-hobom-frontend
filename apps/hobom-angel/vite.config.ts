import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import stylex from "@stylexjs/unplugin";

export default defineConfig({
  // Served under the `/hobom-angel/` path prefix, so assets must resolve there
  // (a root base would 404). Keep this in sync with the router basename.
  base: "/hobom-angel/",
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    // Skip the gzip-size report — it's pure build-time overhead we don't read in CI.
    reportCompressedSize: false,
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
    port: 3001,
    proxy: {
      "/api": {
        target: "https://hobom-system.com/hobom-api-gateway/hobom-angel",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
});
