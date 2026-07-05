import type { CSSProperties, ReactNode } from "react";
import { Hb } from "@/shared/ui";

interface Props {
  children: ReactNode;
  style?: CSSProperties;
}

export const DashboardPaper = ({ children, style }: Props) => (
  <Hb.Paper variant="outlined" style={{ padding: 20, ...style }}>
    {children}
  </Hb.Paper>
);
