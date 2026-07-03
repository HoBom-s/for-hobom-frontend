import * as path from "path";
import { defineConfig } from "vitest/config";
import stylex from "@stylexjs/unplugin";

export default defineConfig({
  // StyleX must compile in the test environment too — `stylex.defineVars` throws
  // at runtime otherwise.
  plugins: [
    stylex.vite({
      unstable_moduleResolution: { type: "commonJS", rootDir: path.resolve(__dirname, "../..") },
    }),
  ],
  test: {
    globals: true,
    coverage: {
      include: ["src/**"],
      exclude: ["src/index.ts", "src/**/*.spec.{ts,tsx}"],
    },
  },
});
