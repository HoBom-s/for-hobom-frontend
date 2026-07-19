import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  prompt: {
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
  required: {
    color: "var(--hb-color-accent-dark)",
  },
  options: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  counter: {
    alignSelf: "flex-end",
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
});
