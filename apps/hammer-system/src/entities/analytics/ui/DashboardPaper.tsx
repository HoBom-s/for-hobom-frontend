import type { ReactNode } from "react";
import { Hb } from "@/shared/ui";
import type { SxProps, Theme } from "@/shared/ui";

interface Props {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const DashboardPaper = ({ children, sx }: Props) => (
  <Hb.Paper
    elevation={0}
    sx={{
      p: 2.5,
      border: "1px solid",
      borderColor: "divider",
      ...sx,
    }}
  >
    {children}
  </Hb.Paper>
);
