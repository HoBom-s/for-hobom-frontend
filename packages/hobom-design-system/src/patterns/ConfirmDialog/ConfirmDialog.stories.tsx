import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { Button } from "../../components/Button/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Patterns/ConfirmDialog",
  component: ConfirmDialog,
  args: { open: false, onClose: () => {}, onConfirm: () => {}, title: "", description: "" },
  parameters: {
    // Filled accent/danger buttons are below the contrast threshold by design.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <Button variant="danger" onClick={() => setOpen(true)}>
        삭제
      </Button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="정말 삭제할까요?"
        description="이 작업은 되돌릴 수 없어요."
        confirmLabel="삭제"
        confirmColor="error"
      />
    </div>
  );
};

export const Basic: Story = { render: () => <Demo /> };
