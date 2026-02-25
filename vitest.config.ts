import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "happy-dom",
      include: ["src/**/*.{spec,test}.{ts,tsx}"],
      typecheck: {
        tsconfig: "./tsconfig.spec.json",
      },
    },
  }),
);
