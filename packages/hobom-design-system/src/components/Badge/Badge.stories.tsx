import { Badge } from "./Badge";
import type { Meta, StoryObj } from "@storybook/react-vite";

const Anchor = () => (
  <div style={{ width: 24, height: 24, borderRadius: 6, background: "var(--hb-color-border)" }} />
);

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: <Anchor /> },
  argTypes: {
    color: { control: "inline-radio", options: ["primary", "error"] },
    badgeContent: { control: "number" },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { badgeContent: 3 } };

export const Error: Story = { args: { badgeContent: 128, max: 99, color: "error" } };
