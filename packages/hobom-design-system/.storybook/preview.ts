import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  // Generate a Docs page (with source snippets) for every component.
  tags: ["autodocs"],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "centered",
    // Fail story tests on accessibility violations (axe).
    a11y: { test: "error" },
  },
};

export default preview;
