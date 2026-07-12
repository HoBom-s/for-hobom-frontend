import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  section: {
    paddingBlock: { default: 48, [DESKTOP]: 64 },
    paddingInline: "clamp(16px, 4vw, 40px)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  inner: { maxWidth: 1120, marginInline: "auto" },
  head: { textAlign: "center", marginBottom: 36 },
  title: {
    margin: 0,
    fontSize: { default: "1.375rem", [DESKTOP]: "1.625rem" },
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  sub: { margin: 0, marginTop: 10, fontSize: "0.9375rem", color: "var(--hb-color-text-secondary)" },
  steps: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "repeat(3, 1fr)" },
    gap: 16,
  },
  step: {
    backgroundColor: "var(--hb-color-surface)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: "var(--hb-angel-radius-card)",
    padding: "28px 24px",
    textAlign: "center",
  },
  num: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: "50%",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent-dark)",
    fontSize: "1.125rem",
    fontWeight: 800,
  },
  stepTitle: {
    margin: 0,
    marginTop: 16,
    fontSize: "1.0625rem",
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
