import type { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

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
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        {icon && (
          <Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Box>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
        {suffix && (
          <Typography variant="body2" color="text.secondary">
            {suffix}
          </Typography>
        )}
      </Box>
      {trend != null && (
        <Box
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
          <Typography variant="caption" fontWeight={500}>
            {trend > 0 ? "+" : ""}
            {trend}%
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
