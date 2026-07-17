import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
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
  // overlapping halos in a dense cluster don't intercept a neighbor's pin.
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
  label: {
    fill: "var(--hb-color-text-primary)",
    fontSize: 13,
    fontWeight: 700,
    paintOrder: "stroke",
    stroke: "#fff",
    strokeWidth: 3.5,
    strokeLinejoin: "round",
    pointerEvents: "none",
  },
});
