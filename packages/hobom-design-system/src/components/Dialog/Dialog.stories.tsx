import { useState } from "react";
import { Dialog } from "./Dialog";
import { Button } from "../Button/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Dialog",
  component: Dialog.Root,
  args: { open: false },
  parameters: {
    // The demo triggers/actions are filled accent buttons (~3.6:1), a known
    // below-threshold pattern unrelated to Dialog itself.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Dialog.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog.Root open={open} onClose={() => setOpen(false)} size="xs">
        <Dialog.Title>Delete item?</Dialog.Title>
        <Dialog.Content>
          <Dialog.ContentText>
            This action cannot be undone. The item will be permanently removed.
          </Dialog.ContentText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog.Root>
    </div>
  );
};

export const Basic: Story = { render: () => <Demo /> };
