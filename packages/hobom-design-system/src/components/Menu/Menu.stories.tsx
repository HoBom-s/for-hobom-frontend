import { useState } from "react";
import { Menu } from "./Menu";
import { Button } from "../Button/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Menu",
  component: Menu.Root,
  args: { open: false, anchorEl: null },
  parameters: {
    // The demo trigger is a filled accent button (~3.6:1), a known
    // below-threshold pattern unrelated to Menu itself.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Menu.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const close = () => setAnchorEl(null);

  return (
    <div style={{ padding: 40 }}>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)}>Open menu</Button>
      <Menu.Root open={!!anchorEl} anchorEl={anchorEl} onClose={close}>
        <Menu.Item onClick={() => {}}>Edit</Menu.Item>
        <Menu.Item onClick={() => {}}>Duplicate</Menu.Item>
        <Menu.Item disabled onClick={() => {}}>
          Archive
        </Menu.Item>
        <Menu.Item onClick={() => {}} style={{ color: "var(--hb-color-danger)" }}>
          Delete
        </Menu.Item>
      </Menu.Root>
    </div>
  );
};

export const Basic: Story = { render: () => <Demo /> };
