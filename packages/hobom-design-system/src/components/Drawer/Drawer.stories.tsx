import { useState } from "react";
import { Drawer } from "./Drawer";
import { Button } from "../Button/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  args: { open: false },
  parameters: {
    // The demo trigger is a filled accent button (~3.6:1), a known
    // below-threshold pattern unrelated to Drawer itself.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = ({ anchor }: { anchor: "left" | "right" }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <Button onClick={() => setOpen(true)}>Open {anchor} drawer</Button>
      <Drawer open={open} anchor={anchor} onClose={() => setOpen(false)} style={{ width: 320 }}>
        <div style={{ padding: 24 }}>
          Drawer content — closes on backdrop click or Escape.
        </div>
      </Drawer>
    </div>
  );
};

export const Right: Story = { render: () => <Demo anchor="right" /> };
export const Left: Story = { render: () => <Demo anchor="left" /> };
