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
            px: 2,
            pt: 2,
            pb: 3,
          },
        },
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {children}
      </Box>
    </Drawer>
  );
};

BottomSheetCTA.Title = ({ children }: Pick<Props, "children">) => {
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      {children}
    </Box>
  );
};

BottomSheetCTA.Body = ({ children }: Pick<Props, "children">) => {
  return <Box>{children}</Box>;
};
