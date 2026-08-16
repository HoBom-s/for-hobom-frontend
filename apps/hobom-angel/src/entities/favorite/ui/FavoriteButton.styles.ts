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
  // Floats over card media — a light frosted disc, not an opaque white blob.
  overlay: {
    color: "var(--hb-angel-on-photo)",
    backgroundColor: {
      default: "var(--hb-angel-disc-scrim)",
      ":hover": "var(--hb-angel-disc-scrim-strong)",
    },
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  // Favorited — the warm (marigold) heart; reads on both surface and photo.
  on: {
    color: "var(--hb-angel-accent-warm-dark)",
  },
});
