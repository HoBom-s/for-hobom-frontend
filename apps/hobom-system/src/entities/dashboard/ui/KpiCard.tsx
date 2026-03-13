import type { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { DashboardPaper } from "./DashboardPaper";

interface KpiCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  trend?: number;
  icon?: ReactNode;
}

export const KpiCard = ({
  label,
  value,
  suffix,
  trend,
  icon,
}: KpiCardProps) => {
  return (
    <DashboardPaper sx={{ height: "100%" }}>
      <Hb.Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Hb.Text variant="body2" color="text.secondary">
          {label}
        </Hb.Text>
        {icon && (
          <Hb.Box sx={{ color: "text.secondary", display: "flex" }}>
            {icon}
          </Hb.Box>
        )}
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
      {trend != null && (
        <Hb.Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
            color: trend >= 0 ? "success.main" : "error.main",
          }}
        >
          {trend >= 0 ? (
            <TrendingUp sx={{ fontSize: 16 }} />
          ) : (
            <TrendingDown sx={{ fontSize: 16 }} />
          )}
          <Hb.Text variant="caption" fontWeight={500}>
            {trend > 0 ? "+" : ""}
            {trend}%
          </Hb.Text>
        </Hb.Box>
      )}
    </DashboardPaper>
  );
};
