import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button", variant: "primary", size: "medium" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "danger", "ghost"] },
    size: { control: "inline-radio", options: ["small", "medium"] },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button variant="primary">primary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="danger">danger</Button>
      <Button variant="ghost">ghost</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Button size="small">small</Button>
      <Button size="medium">medium</Button>
      <Button fullWidth>fullWidth</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Button startIcon={<span>+</span>}>with icon</Button>
      <Button loading>loading</Button>
      <Button disabled>disabled</Button>
      <Button.Icon aria-label="icon">
        <span>×</span>
      </Button.Icon>
      <Button.Icon variant="danger" aria-label="delete">
        <span>🗑</span>
      </Button.Icon>
    </div>
  ),
};
