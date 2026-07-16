import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 34,
    height: 34,
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
  // Floats over card media, so it needs a legible backdrop.
  overlay: {
    position: "absolute",
    top: 10,
    insetInlineEnd: 10,
    backgroundColor: { default: "rgba(255, 255, 255, 0.92)", ":hover": "rgba(255, 255, 255, 1)" },
    boxShadow: "var(--hb-angel-shadow)",
  },
  on: {
    color: "var(--hb-color-accent-dark)",
  },
});
