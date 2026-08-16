import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  prompt: {
    fontSize: "1.0625rem",
    lineHeight: 1.5,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  required: {
    color: "var(--hb-angel-accent-warm-dark)",
  },
  options: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  counter: {
    alignSelf: "flex-end",
    fontSize: "0.75rem",
    fontVariantNumeric: "tabular-nums",
    color: "var(--hb-color-text-secondary)",
  },
});
