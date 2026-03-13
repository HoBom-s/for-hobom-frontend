import type { ReactNode } from "react";
import { Paper, type SxProps, type Theme } from "@mui/material";

interface Props {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const DashboardPaper = ({ children, sx }: Props) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      border: "1px solid",
      borderColor: "divider",
      ...sx,
    }}
  >
    {children}
  </Paper>
);
