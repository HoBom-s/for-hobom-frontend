import * as path from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";
import stylex from "@stylexjs/unplugin";
import type { StorybookConfig } from "@storybook/react-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  // Docs = source snippets; a11y = axe panel + test checks; vitest = run stories
  // (and their play functions) as tests.
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  // StyleX must compile the component source Storybook renders, otherwise
  // `stylex.defineVars` throws at runtime.
  async viteFinal(cfg) {
    return mergeConfig(cfg, {
      plugins: [
        stylex.vite({
          unstable_moduleResolution: {
            type: "commonJS",
            rootDir: path.resolve(dirname, "../../.."),
          },
        }),
      ],
    });
  },
};

export default config;
