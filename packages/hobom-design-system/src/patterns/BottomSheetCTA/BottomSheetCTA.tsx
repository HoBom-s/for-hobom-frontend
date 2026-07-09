import type { ReactNode } from "react";
import { Box } from "../../components/Box/Box";
import { Dialog } from "../../components/Dialog/Dialog";

interface Props {
  children: ReactNode;
  open: boolean;
  height?: string;
  onClose: () => void;
}

export const BottomSheetCTA = ({ children, open, height, onClose }: Props) => (
  <Dialog.Root open={open} onClose={onClose} size="sm">
    <Box style={{ display: "flex", flexDirection: "column", height: height ?? "auto" }}>
      {children}
    </Box>
  </Dialog.Root>
);

BottomSheetCTA.Title = ({ children }: Pick<Props, "children">) => (
  <Dialog.Title
    style={{ display: "flex", width: "100%", justifyContent: "center", paddingBottom: 8 }}
  >
    {children}
  </Dialog.Title>
);

BottomSheetCTA.Body = ({ children }: Pick<Props, "children">) => (
  <Dialog.Content style={{ flex: 1, overflowY: "auto" }}>{children}</Dialog.Content>
);

BottomSheetCTA.Footer = ({ children }: Pick<Props, "children">) => (
  <Dialog.Actions style={{ paddingInline: 24, paddingBlock: 16 }}>{children}</Dialog.Actions>
);
