import type { ReactNode } from "react";
import { InfoOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { DashboardPaper } from "./DashboardPaper";

interface KpiCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  icon?: ReactNode;
  description?: string;
}

export const KpiCard = ({ label, value, suffix, icon, description }: KpiCardProps) => {
  return (
    <DashboardPaper sx={{ height: "100%" }}>
      <Hb.Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Hb.Text variant="body2" color="text.secondary">
            {label}
          </Hb.Text>
          {description && (
            <Hb.Tooltip title={description} placement="top" arrow>
              <InfoOutlined sx={{ fontSize: 14, color: "text.disabled", cursor: "help" }} />
            </Hb.Tooltip>
          )}
        </Hb.Box>
        {icon && <Hb.Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Hb.Box>}
      </Hb.Box>
      <Hb.Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
        <Hb.Text variant="h4" fontWeight={700}>
          {value}
        </Hb.Text>
        {suffix && (
          <Hb.Text variant="body2" color="text.secondary">
            {suffix}
          </Hb.Text>
        )}
      </Hb.Box>
    </DashboardPaper>
  );
};
