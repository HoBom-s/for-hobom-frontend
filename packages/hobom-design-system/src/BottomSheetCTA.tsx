import type { ReactNode } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  children: ReactNode;
  open: boolean;
  height?: string;
  onClose: () => void;
}

export const BottomSheetCTA = ({ children, open, height, onClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={false}
    >
      <Box display="flex" flexDirection="column" height={height ?? "auto"}>
        {children}
      </Box>
    </Dialog>
  );
};

BottomSheetCTA.Title = ({ children }: Pick<Props, "children">) => {
  return (
    <DialogTitle
      sx={{ display: "flex", width: "100%", justifyContent: "center", pb: 1 }}
    >
      {children}
    </DialogTitle>
  );
};

BottomSheetCTA.Body = ({ children }: Pick<Props, "children">) => {
  return (
    <DialogContent sx={{ flex: 1, overflowY: "auto" }}>
      {children}
    </DialogContent>
  );
};

BottomSheetCTA.Footer = ({ children }: Pick<Props, "children">) => {
  return <DialogActions sx={{ px: 3, py: 2 }}>{children}</DialogActions>;
};
