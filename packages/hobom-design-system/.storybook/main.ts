import * as path from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";
import stylex from "@stylexjs/unplugin";
import type { StorybookConfig } from "@storybook/react-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  // Provides the Docs pages and the "Show code" source snippet for each story.
  addons: ["@storybook/addon-docs"],
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
