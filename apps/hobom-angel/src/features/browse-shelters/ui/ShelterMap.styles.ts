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
    backgroundColor: "var(--hb-color-surface-subtle)",
    padding: 16,
    boxSizing: "border-box",
  },
  province: {
    fill: "var(--hb-color-surface)",
    stroke: "var(--hb-color-border)",
    strokeWidth: 0.75,
    strokeLinejoin: "round",
  },
  // The province matching the active region filter.
  active: {
    fill: "var(--hb-color-accent-subtle, var(--hb-color-surface))",
    stroke: "var(--hb-color-accent)",
    strokeWidth: 1.25,
  },
  pinGroup: {
    cursor: "pointer",
    outline: "none",
  },
  pin: {
    fill: "var(--hb-color-accent)",
    stroke: "#fff",
    strokeWidth: 2,
    transition: "r 0.12s ease",
  },
  label: {
    fill: "var(--hb-color-text-primary)",
    fontSize: 13,
    fontWeight: 600,
    paintOrder: "stroke",
    stroke: "var(--hb-color-surface)",
    strokeWidth: 3,
    strokeLinejoin: "round",
  },
});
