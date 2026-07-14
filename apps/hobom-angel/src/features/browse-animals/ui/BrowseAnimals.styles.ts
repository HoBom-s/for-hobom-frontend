import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    // Top spacing comes from the sticky filter bar; keep only the bottom.
    paddingBottom: 24,
  },
  resultRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginBlock: 16,
  },
  count: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
    marginInlineEnd: 4,
  },
});
