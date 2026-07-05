import * as stylex from "@stylexjs/stylex";
import { ColorSchemeVars } from "../src/foundations/color-scheme";
import { SCHEME_ATTR } from "../src/foundations/tokens/css-vars";
import type { Preview } from "@storybook/react-vite";

const styles = stylex.create({
  root: {
    backgroundColor: "var(--hb-color-canvas)",
    color: "var(--hb-color-text-primary)",
    padding: 32,
    borderRadius: 8,
    minWidth: 200,
  },
});

const preview: Preview = {
  // Generate a Docs page (with source snippets) for every component.
  tags: ["autodocs"],
  globalTypes: {
    colorScheme: {
      description: "Color scheme",
      toolbar: {
        title: "Scheme",
        icon: "contrast",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { colorScheme: "light" },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.colorScheme === "dark";

      return (
        <div {...{ [SCHEME_ATTR]: isDark ? "dark" : undefined }} {...stylex.props(styles.root)}>
          <ColorSchemeVars />
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "centered",
    // Fail story tests on accessibility violations (axe).
    a11y: { test: "error" },
  },
};

export default preview;
