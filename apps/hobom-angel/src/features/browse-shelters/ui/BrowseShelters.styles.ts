import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingBlock: 24,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: 0,
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },
  count: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
    marginBlock: 16,
  },
});
