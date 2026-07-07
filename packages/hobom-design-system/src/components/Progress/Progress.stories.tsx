import { Progress } from "./Progress";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Progress",
  component: Progress.Circular,
} satisfies Meta<typeof Progress.Circular>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Progress.Circular size={24} />
      <Progress.Circular size={40} />
      <Progress.Circular size={56} />
    </div>
  ),
};

export const Linear: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Progress.Linear />
    </div>
  ),
};
