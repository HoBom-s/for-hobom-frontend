import { Stack } from "./Stack";
import { Divider } from "../Divider/Divider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Stack",
  component: Stack,
  args: { spacing: 2 },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

const cell = (label: string) => (
  <div
    style={{
      padding: 8,
      background: "var(--hb-color-surface)",
      border: "1px solid var(--hb-color-border)",
      borderRadius: 6,
    }}
  >
    {label}
  </div>
);

export const Column: Story = {
  render: (args) => (
    <Stack {...args}>
      {cell("one")}
      {cell("two")}
      {cell("three")}
    </Stack>
  ),
};

export const Row: Story = {
  render: () => (
    <Stack direction="row" spacing={1.5} alignItems="center">
      {cell("one")}
      {cell("two")}
      {cell("three")}
    </Stack>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      {cell("one")}
      {cell("two")}
      {cell("three")}
    </Stack>
  ),
};
