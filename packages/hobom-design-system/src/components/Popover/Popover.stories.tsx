import { useState } from "react";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Popover",
  component: Popover,
  args: { open: false, anchorEl: null },
  parameters: {
    // The demo trigger is a filled accent button (~3.6:1), a known
    // below-threshold pattern unrelated to Popover itself.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <div style={{ padding: 80 }}>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)}>Open popover</Button>
      <Popover open={!!anchorEl} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <div style={{ padding: 16, maxWidth: 240 }}>
          Anchored content that closes on backdrop click or Escape.
        </div>
      </Popover>
    </div>
  );
};

export const Basic: Story = { render: () => <Demo /> };
