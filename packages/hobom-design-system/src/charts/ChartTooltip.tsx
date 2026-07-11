import type { ChartHoverEntry } from "./types";

interface ChartTooltipProps {
  x: number;
  y: number;
  title: string;
  entries: readonly ChartHoverEntry[];
  format: (value: number) => string;
}

/** A popover anchored above a hovered point, listing each series' value. */
export const ChartTooltip = ({ x, y, title, entries, format }: ChartTooltipProps) => (
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
    {title && (
      <div style={{ color: "var(--hb-color-text-secondary)", fontSize: 11, marginBottom: 2 }}>
        {title}
      </div>
    )}
    {entries.map((entry) => (
      <div
        key={entry.label}
        style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, lineHeight: 1.5 }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: entry.color,
            flexShrink: 0,
          }}
        />
        {entries.length > 1 && (
          <span style={{ color: "var(--hb-color-text-secondary)" }}>{entry.label}</span>
        )}
        <span style={{ marginLeft: "auto", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
          {format(entry.value)}
        </span>
      </div>
    ))}
  </div>
);
