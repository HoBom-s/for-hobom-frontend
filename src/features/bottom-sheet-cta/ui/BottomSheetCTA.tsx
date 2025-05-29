import type { ReactNode } from "react";
import { Drawer, Box } from "@mui/material";

interface Props {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export const BottomSheetCTA = ({ children, open, onClose }: Props) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      disableEscapeKeyDown={false}
      ModalProps={{
        keepMounted: true,
        onClose,
      }}
      slotProps={{
        paper: {
          sx: {
            height: "50vh",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 0,
            flexDirection: "column",
          },
        },
      }}
    >
      <Box display="flex" flexDirection="column" gap={2} height="100%">
        {children}
      </Box>
    </Drawer>
  );
};

BottomSheetCTA.Title = ({ children }: Pick<Props, "children">) => {
  return (
    <Box
      px={2}
      pt={2}
      sx={{ display: "flex", width: "100%", justifyContent: "center" }}
    >
      {children}
    </Box>
  );
};

BottomSheetCTA.Body = ({ children }: Pick<Props, "children">) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        px: 2,
        py: 2,
      }}
    >
      {children}
    </Box>
  );
};

BottomSheetCTA.Footer = ({ children }: Pick<Props, "children">) => {
  return (
    <Box
      sx={{
        px: 2,
        py: 2,
      }}
    >
      {children}
    </Box>
  );
};
