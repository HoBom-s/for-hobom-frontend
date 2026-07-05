import * as stylex from "@stylexjs/stylex";
import { darkTheme, scheme } from "../src/foundations/tokens/theme.stylex";
import type { Preview } from "@storybook/react-vite";

const styles = stylex.create({
  root: {
    backgroundColor: scheme.canvas,
    color: scheme.textPrimary,
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
        <div {...stylex.props(isDark && darkTheme, styles.root)}>
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
