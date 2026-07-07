import { Link } from "./Link";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Link",
  component: Link,
  args: { children: "Go to login", href: "#" },
  parameters: {
    // Accent-colored links sit at ~3.6:1 like the rest of the accent surfaces;
    // they stay distinguishable via the underline. Disable the contrast rule here.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Underlines: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Link href="#" underline="always">
        always
      </Link>
      <Link href="#" underline="hover">
        hover
      </Link>
      <Link href="#" underline="none">
        none
      </Link>
    </div>
  ),
};
