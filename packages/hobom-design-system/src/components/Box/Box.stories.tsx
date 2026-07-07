import { Box } from "./Box";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Box",
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

const cell = (label: string) => (
  <div style={{ padding: 8, background: "var(--hb-color-surface)", border: "1px solid var(--hb-color-border)", borderRadius: 6 }}>
    {label}
  </div>
);

export const AsFlexRow: Story = {
  render: () => (
    <Box style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {cell("one")}
      {cell("two")}
      {cell("three")}
    </Box>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <Box component="section" style={{ padding: 16, border: "1px dashed var(--hb-color-border)" }}>
      rendered as &lt;section&gt;
    </Box>
  ),
};
