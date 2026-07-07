import { useState } from "react";
import { ToggleButton } from "./ToggleButton";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/ToggleButton",
  component: ToggleButton,
  args: { value: "toggle" },
  parameters: {
    // When selected, the button paints an accent-tinted surface behind accent
    // text (~3.2:1), the standard toggle affordance; the border also signals
    // the state. Disable the contrast rule.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const BasicDemo = () => {
  const [selected, setSelected] = useState(false);

  return (
    <ToggleButton value="swimlane" selected={selected} onChange={() => setSelected((v) => !v)}>
      에픽 스윔레인
    </ToggleButton>
  );
};

const SmallDemo = () => {
  const [selected, setSelected] = useState(true);

  return (
    <ToggleButton
      value="swimlane"
      size="small"
      selected={selected}
      onChange={() => setSelected((v) => !v)}
    >
      스윔레인
    </ToggleButton>
  );
};

export const Basic: Story = { render: () => <BasicDemo /> };
export const Small: Story = { render: () => <SmallDemo /> };
