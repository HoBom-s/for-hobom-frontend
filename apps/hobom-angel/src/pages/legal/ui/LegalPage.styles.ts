import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 768px)";

export const styles = stylex.create({
  root: {
    maxWidth: 760,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: { default: 24, [DESKTOP]: 40 },
    paddingBottom: 64,
  },
  header: {
    paddingBottom: 24,
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-border)",
  },
  kicker: {
    display: "block",
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
    marginBottom: 12,
  },
  title: {
    margin: 0,
    fontSize: { default: "1.625rem", [DESKTOP]: "2rem" },
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  effective: {
    display: "block",
    marginTop: 12,
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  intro: {
    margin: "0 0 32px",
    fontSize: "1rem",
    lineHeight: 1.75,
    color: "var(--hb-color-text-secondary)",
  },
  section: { marginBottom: 28 },
  heading: {
    margin: "0 0 12px",
    fontSize: "1.0625rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  paragraph: {
    margin: "0 0 8px",
    fontSize: "0.9375rem",
    lineHeight: 1.75,
    color: "var(--hb-color-text-secondary)",
  },
  bullet: {
    position: "relative",
    margin: "0 0 6px",
    paddingInlineStart: 16,
    fontSize: "0.9375rem",
    lineHeight: 1.7,
    color: "var(--hb-color-text-secondary)",
    "::before": {
      content: "''",
      position: "absolute",
      insetInlineStart: 2,
      top: "0.6em",
      width: 5,
      height: 5,
      borderRadius: "50%",
      backgroundColor: "var(--hb-color-accent)",
    },
  },
});
