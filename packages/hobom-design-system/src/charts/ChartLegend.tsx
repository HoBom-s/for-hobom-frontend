export interface LegendItem {
  label: string;
  color: string;
}

/** A horizontal legend of colored swatches, shown under the plot. */
export const ChartLegend = ({ items }: { items: readonly LegendItem[] }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "6px 16px",
      justifyContent: "center",
      marginTop: 8,
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: 12,
      color: "var(--hb-color-text-secondary)",
    }}
  >
    {items.map((item) => (
      <span key={item.label} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            backgroundColor: item.color,
            flexShrink: 0,
          }}
        />
        {item.label}
      </span>
    ))}
  </div>
);
