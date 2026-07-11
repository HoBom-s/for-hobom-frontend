interface ChartTooltipProps {
  x: number;
  y: number;
  label: string;
  value: string;
}

/** A small popover anchored above a hovered datum. */
export const ChartTooltip = ({ x, y, label, value }: ChartTooltipProps) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: "translate(-50%, calc(-100% - 10px))",
      pointerEvents: "none",
      whiteSpace: "nowrap",
      backgroundColor: "var(--hb-color-surface)",
      color: "var(--hb-color-text-primary)",
      border: "1px solid var(--hb-color-border)",
      borderRadius: 8,
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.14)",
      padding: "6px 10px",
      fontFamily: "'Inter', system-ui, sans-serif",
      zIndex: 1,
    }}
  >
    <div style={{ color: "var(--hb-color-text-secondary)", fontSize: 11 }}>{label}</div>
    <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{value}</div>
  </div>
);
