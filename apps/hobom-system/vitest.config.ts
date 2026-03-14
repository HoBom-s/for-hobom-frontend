import * as path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    include: ["src/**/*.{spec,test}.{ts,tsx}"],
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
        functions: 20,
      },
    },
  },
});
