import * as path from "path";
import { defineConfig } from "vitest/config";
import stylex from "@stylexjs/unplugin";

export default defineConfig({
  // StyleX must compile design-system source pulled in by tests too, so the
  // package is inlined (Vite externalizes node_modules by default) and the
  // plugin runs over it — otherwise `stylex.defineVars` throws at runtime.
  plugins: [
    stylex.vite({
      unstable_moduleResolution: { type: "commonJS", rootDir: path.resolve(__dirname, "../..") },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    include: ["src/**/*.{spec,test}.{ts,tsx}"],
    server: {
      deps: {
        inline: ["hobom-design-system"],
      },
    },
    typecheck: {
      tsconfig: "./tsconfig.spec.json",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: [
        "src/**/*.type.ts",
        "src/**/index.ts",
        "src/main.tsx",
        "src/App.tsx",
        "src/**/*.spec.{ts,tsx}",
        "src/**/*.test.{ts,tsx}",
      ],
      thresholds: {
        lines: 10,
        branches: 10,
        functions: 15,
      },
    },
  },
});
