import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  // Floating hero photo — resting elevation lifts the media off the canvas.
  hero: {
    borderRadius: 26,
    overflow: "hidden",
    boxShadow: "none",
  },
  thumbs: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  // Touch target >= 40px; borderless resting → accent ring on hover/active.
  thumb: {
    width: 84,
    height: 64,
    padding: 0,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: { default: "transparent", ":hover": "var(--hb-angel-green-tint-strong)" },
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    cursor: "pointer",
    transitionProperty: "transform, border-color, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":hover": { transform: "translateY(-2px)" },
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
    [REDUCE]: {
      transitionProperty: "none",
      ":hover": { transform: "none" },
    },
  },
  thumbActive: {
    borderColor: "var(--hb-color-accent)",
    boxShadow: "var(--hb-angel-glow-accent)",
  },
});
