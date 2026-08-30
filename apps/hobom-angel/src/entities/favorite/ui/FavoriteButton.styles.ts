import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: 999,
    borderWidth: 0,
    borderStyle: "none",
    cursor: "pointer",
    color: "var(--hb-color-text-secondary)",
    backgroundColor: { default: "transparent", ":hover": "var(--hb-color-canvas)" },
    transitionProperty: "color, background-color",
    transitionDuration: "0.15s",
  },
  // Claude Design card media uses a warm white translucent favorite disc.
  overlay: {
    color: "var(--hb-color-text-secondary)",
    backgroundColor: {
      default: "rgba(251,247,240,0.85)",
      ":hover": "var(--hb-color-surface)",
    },
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  // Favorited — the warm (marigold) heart; reads on both surface and photo.
  on: {
    color: "var(--hb-angel-accent-warm-dark)",
  },
});
