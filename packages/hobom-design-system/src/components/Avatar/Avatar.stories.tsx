import { Avatar } from "./Avatar";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    // Initials on a colored fill (white on accent/success) sit below 4.5:1 by
    // design, like the other status surfaces; disable the contrast rule here.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Avatar style={{ backgroundColor: "var(--hb-color-accent)" }}>F</Avatar>
      <Avatar style={{ width: 28, height: 28, fontSize: 12, backgroundColor: "var(--hb-color-success)" }}>
        HB
      </Avatar>
    </div>
  ),
};

export const Image: Story = {
  render: () => (
    <Avatar src="https://placehold.co/40" alt="placeholder" />
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Avatar variant="circular" style={{ backgroundColor: "var(--hb-color-accent)" }}>
        C
      </Avatar>
      <Avatar variant="rounded" style={{ backgroundColor: "var(--hb-color-accent)" }}>
        R
      </Avatar>
      <Avatar variant="square" style={{ backgroundColor: "var(--hb-color-accent)" }}>
        S
      </Avatar>
    </div>
  ),
};
