import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingBlock: 48,
    // Fill the content region so the spinner sits in the vertical center, not
    // pinned to the top of the screen.
    minHeight: "60vh",
  },
  // Pin to the viewport so the initial/global fallback is truly centered,
  // independent of whatever parent happens to be mounting.
  fullScreen: { position: "fixed", inset: 0, backgroundColor: "var(--hb-color-surface)" },
  text: { fontSize: "0.9375rem", color: "var(--hb-color-text-secondary)" },
});
