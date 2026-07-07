import * as stylex from "@stylexjs/stylex";
import { Hb } from "@/shared/ui";
import { PERIOD_LABEL, SYSTEM_PERIOD_LABEL } from "../model/dashboard-period.model";
import type { PeriodType, SystemPeriodType } from "../api/dashboard.type";

const styles = stylex.create({
  root: {
    paddingInline: 16,
    paddingBlock: 6,
    borderRadius: 12,
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
  inactive: {
    color: "var(--hb-color-text-secondary)",
    backgroundColor: { default: "transparent", ":hover": "rgba(0,0,0,0.06)" },
  },
});

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

type PeriodSelectorProps = DefaultPeriodSelectorProps | SystemPeriodSelectorProps;

export const PeriodSelector = (props: PeriodSelectorProps) => {
  const labels = props.type === "system" ? SYSTEM_PERIOD_LABEL : PERIOD_LABEL;
  const activeColor =
    props.type === "system" ? "var(--hb-color-warning)" : "var(--hb-color-accent)";

  return (
    <Hb.Box
      style={{
        display: "inline-flex",
        gap: 6,
        padding: 4,
        backgroundColor: "grey.100",
        borderRadius: 16,
      }}
    >
      {Object.entries(labels).map(([key, label]) => {
        const isActive = props.period === key;

        return (
          <Hb.ButtonBase
            key={key}
            onClick={() => {
              if (!isActive) props.onChange(key as never);
            }}
            {...stylex.props(styles.root, !isActive && styles.inactive)}
            style={
              isActive
                ? {
                    backgroundColor: activeColor,
                    color: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }
                : undefined
            }
          >
            <Hb.Text
              variant="body2"
              style={{
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
