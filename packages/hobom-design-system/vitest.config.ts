import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      include: ["src/**"],
      exclude: ["src/index.ts", "src/**/*.spec.{ts,tsx}"],
    },
  },
});
