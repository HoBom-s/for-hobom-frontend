import * as path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import stylex from "@stylexjs/unplugin";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(dirname, "../..");

// StyleX must compile in the test environment too — `stylex.defineVars` throws
// at runtime otherwise. The storybook project inherits it from `.storybook`'s
// viteFinal.
const stylexPlugin = stylex.vite({
  unstable_moduleResolution: { type: "commonJS", rootDir },
});

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**"],
      exclude: ["src/index.ts", "src/**/*.spec.{ts,tsx}", "src/**/*.stories.tsx"],
    },
    projects: [
      {
        plugins: [stylexPlugin],
        test: {
          name: "unit",
          globals: true,
          environment: "happy-dom",
          include: ["src/**/*.spec.{ts,tsx}"],
        },
      },
      {
        // Runs every story (and its play function) as a test in a real browser,
        // with accessibility checks from the a11y addon (auto-applied by
        // addon-vitest since Storybook 10.3).
        plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
