import { Divider } from "./Divider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Divider",
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 220 }}>
      <div>Above</div>
      <Divider style={{ marginTop: 12, marginBottom: 12 }} />
      <div>Below</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", height: 40, gap: 12 }}>
      <span>Left</span>
      <Divider orientation="vertical" flexItem />
      <span>Right</span>
    </div>
  ),
};
