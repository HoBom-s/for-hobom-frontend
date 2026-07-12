import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingBlock: 48,
  },
  fullScreen: { minHeight: "100vh" },
  text: { fontSize: "0.9375rem", color: "var(--hb-color-text-secondary)" },
});
