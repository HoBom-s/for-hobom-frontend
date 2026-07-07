import { Checkbox } from "./Checkbox";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Checkbox aria-label="unchecked" />
      <Checkbox aria-label="checked" defaultChecked />
      <Checkbox aria-label="small" size="small" defaultChecked />
      <Checkbox aria-label="disabled" disabled defaultChecked />
    </div>
  ),
};
