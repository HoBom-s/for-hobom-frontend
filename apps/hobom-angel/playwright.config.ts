// @ts-ignore
import process from "node:process";
import { defineConfig, devices } from "@playwright/test";

/**
 * E2E runs against a production build served by `vite preview`, with MSW on
 * (`VITE_ENABLE_MSW=true`) so the browser talks to in-memory mocks — never a
 * live backend. The base path mirrors Vite's `base` (/hobom-angel/).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4173/hobom-angel/",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "VITE_ENABLE_MSW=true pnpm build && pnpm preview --port 4173 --strictPort",
    url: "http://localhost:4173/hobom-angel/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
