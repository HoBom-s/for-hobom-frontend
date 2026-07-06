import { Paper } from "./Paper";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Paper",
  component: Paper,
  args: {
    children: <div style={{ padding: 24, minWidth: 160 }}>Paper content</div>,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["elevation", "outlined"] },
    elevation: { control: { type: "number", min: 0, max: 4 } },
  },
} satisfies Meta<typeof Paper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Elevation: Story = {};

export const Outlined: Story = {
  args: { variant: "outlined" },
};

export const Flat: Story = {
  args: { elevation: 0 },
};
