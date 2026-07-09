import type { ReactNode } from "react";
import { Button } from "../../components/Button/Button";
import { Dialog } from "../../components/Dialog/Dialog";
import { Text } from "../../components/Text/Text";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  confirmColor?: "primary" | "success" | "error";
  onConfirm: () => void;
  isPending?: boolean;
}

export const ConfirmDialog = ({
  open,
  onClose,
  title,
  description,
  confirmLabel = "확인",
  confirmColor = "primary",
  onConfirm,
  isPending = false,
}: ConfirmDialogProps) => (
  <Dialog.Root open={open} onClose={onClose} size="xs">
    <Dialog.Title>{title}</Dialog.Title>
    <Dialog.Content>
      <Text variant="body2" style={{ color: "var(--hb-color-text-secondary)" }}>
        {description}
      </Text>
    </Dialog.Content>
    <Dialog.Actions style={{ paddingInline: 24, paddingBottom: 16 }}>
      <Button variant="secondary" onClick={onClose}>
        취소
      </Button>
      <Button
        variant={confirmColor === "error" ? "danger" : "primary"}
        onClick={onConfirm}
        loading={isPending}
      >
        {confirmLabel}
      </Button>
    </Dialog.Actions>
  </Dialog.Root>
);
