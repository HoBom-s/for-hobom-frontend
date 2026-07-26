import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  wrap: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    insetInlineStart: "50%",
    insetBlockStart: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 500,
    padding: "16px 20px",
    borderRadius: 12,
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.16)",
  },
  map: {
    display: "block",
    height: "min(68vh, 600px)",
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    // A faint water tone so the land reads clearly against it.
    backgroundColor: "oklch(0.975 0.012 210)",
    padding: 16,
    boxSizing: "border-box",
    touchAction: "none",
    cursor: "grab",
  },
  // While zoomed in the map can be panned.
  grabbing: {
    cursor: { default: "grab", ":active": "grabbing" },
  },
  province: {
    // Light Angel-green land with a clear medium border — high enough contrast
    // to read the shape and the province divisions at a glance.
    fill: "oklch(0.93 0.038 155)",
    stroke: "oklch(0.68 0.05 155)",
    strokeWidth: 1,
    strokeLinejoin: "round",
  },
  // The province matching the active region filter.
  active: {
    fill: "oklch(0.82 0.085 155)",
    stroke: "var(--hb-color-accent)",
    strokeWidth: 1.75,
  },
  pinGroup: {
    cursor: "pointer",
    outline: "none",
  },
  // The halo and label are decorative — only the pin captures clicks, so
  // overlapping halos in a dense cluster don't intercept a neighbor's click.
  halo: {
    fill: "var(--hb-color-accent)",
    opacity: 0.2,
    pointerEvents: "none",
  },
  pin: {
    fill: "var(--hb-color-accent)",
    stroke: "#fff",
    strokeWidth: 2.5,
  },
  labelLayer: {
    pointerEvents: "none",
  },
  label: {
    fill: "var(--hb-color-text-primary)",
    fontSize: 13,
    fontWeight: 700,
    paintOrder: "stroke",
    stroke: "#fff",
    strokeWidth: 3.5,
    strokeLinejoin: "round",
  },
  // A small count bubble that rides on the pin (e.g. the matching-animal count).
  badge: {
    fill: "var(--hb-color-accent-dark, var(--hb-color-accent))",
    stroke: "#fff",
    strokeWidth: 1.5,
  },
  badgeText: {
    fill: "#fff",
    fontSize: 10,
    fontWeight: 700,
    textAnchor: "middle",
    dominantBaseline: "central",
  },
  zoom: {
    position: "absolute",
    insetBlockEnd: 14,
    insetInlineEnd: 14,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  zoomButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 8,
    backgroundColor: { default: "var(--hb-color-surface)", ":hover": "var(--hb-color-surface-subtle)" },
    color: "var(--hb-color-text-primary)",
    fontSize: "1.05rem",
    lineHeight: 1,
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.14)",
    opacity: { default: 1, ":disabled": 0.4 },
  },
});
