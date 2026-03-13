import { Box, ButtonBase, Typography } from "@mui/material";
import {
  PERIOD_LABEL,
  SYSTEM_PERIOD_LABEL,
} from "../model/dashboard-period.model";
import type { PeriodType, SystemPeriodType } from "../api/dashboard.type";

interface DefaultPeriodSelectorProps {
  type?: "default";
  period: PeriodType;
  onChange: (period: PeriodType) => void;
}

interface SystemPeriodSelectorProps {
  type: "system";
  period: SystemPeriodType;
  onChange: (period: SystemPeriodType) => void;
}

type PeriodSelectorProps =
  | DefaultPeriodSelectorProps
  | SystemPeriodSelectorProps;

export const PeriodSelector = (props: PeriodSelectorProps) => {
  const labels = props.type === "system" ? SYSTEM_PERIOD_LABEL : PERIOD_LABEL;
  const color = props.type === "system" ? "warning.main" : "primary.main";

  return (
    <Box
      sx={{
        display: "inline-flex",
        gap: 0.75,
        p: 0.5,
        bgcolor: "grey.100",
        borderRadius: 2,
      }}
    >
      {Object.entries(labels).map(([key, label]) => {
        const isActive = props.period === key;

        return (
          <ButtonBase
            key={key}
            onClick={() => {
              if (!isActive) props.onChange(key as never);
            }}
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 1.5,
              fontFamily: "inherit",
              transition: "all 0.2s ease",
              ...(isActive
                ? {
                    bgcolor: color,
                    color: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }
                : {
                    bgcolor: "transparent",
                    color: "text.secondary",
                    "&:hover": {
                      bgcolor: "grey.200",
                    },
                  }),
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: isActive ? 600 : 500,
                fontSize: "0.8125rem",
                lineHeight: 1.5,
              }}
            >
              {label}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
};
