import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

export const styles = stylex.create({
  section: {
    paddingBlock: "var(--hb-angel-space-section)",
    paddingInline: "clamp(16px, 4vw, 40px)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  inner: { maxWidth: 1120, marginInline: "auto" },
  head: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 40,
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
    marginBottom: 12,
  },
  title: {
    margin: 0,
    fontSize: { default: "1.625rem", [DESKTOP]: "1.75rem" },
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  sub: {
    margin: 0,
    marginTop: 10,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  steps: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "repeat(3, 1fr)" },
    gap: 16,
  },
  step: {
    position: "relative",
    backgroundColor: "var(--hb-color-surface)",
    borderRadius: "var(--hb-angel-radius-card)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    padding: "28px 24px",
    textAlign: "center",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":hover": { transform: "translateY(-3px)", boxShadow: "var(--hb-angel-shadow-md)" },
    [REDUCE]: { transitionProperty: "none", ":hover": { transform: "none" } },
  },
  num: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: "50%",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent-dark)",
    fontSize: "1.25rem",
    fontWeight: 800,
    fontVariantNumeric: "tabular-nums",
    boxShadow: "0 0 0 6px var(--hb-color-surface), 0 0 0 8px var(--hb-angel-warm-tint)",
  },
  stepTitle: {
    margin: 0,
    marginTop: 20,
    fontSize: "1.125rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  desc: {
    margin: 0,
    marginTop: 8,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
});
