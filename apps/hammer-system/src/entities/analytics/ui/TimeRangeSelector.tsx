import { Hb } from "@/shared/ui";
import { TIME_RANGE_LABEL } from "../model/time-range.model";
import type { TimeRange } from "../api/analytics.type";

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

export const TimeRangeSelector = ({ value, onChange }: TimeRangeSelectorProps) => {
  return (
    <Hb.Box
      sx={{
        display: "inline-flex",
        gap: 0.75,
        p: 0.5,
        bgcolor: "grey.100",
        borderRadius: 2,
      }}
    >
      {Object.entries(TIME_RANGE_LABEL).map(([key, label]) => {
        const isActive = value === key;

        return (
          <Hb.ButtonBase
            key={key}
            onClick={() => {
              if (!isActive) onChange(key as TimeRange);
            }}
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 1.5,
              fontFamily: "inherit",
              transition: "all 0.2s ease",
              ...(isActive
                ? {
                    bgcolor: "primary.main",
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
            <Hb.Text
              variant="body2"
              sx={{
                fontWeight: isActive ? 600 : 500,
                fontSize: "0.8125rem",
                lineHeight: 1.5,
              }}
            >
              {label}
            </Hb.Text>
          </Hb.ButtonBase>
        );
      })}
    </Hb.Box>
  );
};
