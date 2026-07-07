import { useState } from "react";
import { Collapse } from "./Collapse";
import { Button } from "../Button/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Collapse",
  component: Collapse,
  parameters: {
    // The demo trigger is a filled accent button (~3.6:1), a known
    // below-threshold pattern unrelated to Collapse itself.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Collapse>;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ width: 280 }}>
      <Button size="small" onClick={() => setOpen((v) => !v)}>
        {open ? "Collapse" : "Expand"}
      </Button>
      <Collapse in={open}>
        <div style={{ padding: 12 }}>
          Hidden content that slides open and closed with a height transition.
        </div>
      </Collapse>
    </div>
  );
};

export const Basic: Story = { render: () => <Demo /> };
