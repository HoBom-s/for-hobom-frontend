import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  section: {
    paddingBlock: { default: "48px 40px", [DESKTOP]: "72px 56px" },
    backgroundColor: "var(--hb-color-surface)",
  },
  inner: {
    maxWidth: 720,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 40px)",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    paddingBlock: 8,
    paddingInline: 16,
    borderRadius: 999,
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent-dark)",
    fontSize: "0.8125rem",
    fontWeight: 600,
  },
  title: {
    margin: 0,
    marginTop: 24,
    fontSize: { default: "34px", [TABLET]: "44px", [DESKTOP]: "52px" },
    lineHeight: 1.25,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  lead: {
    margin: 0,
    marginTop: 20,
    marginInline: "auto",
    maxWidth: 520,
    fontSize: "1rem",
    lineHeight: 1.7,
    color: "var(--hb-color-text-secondary)",
  },
  cta: { marginTop: 28, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 },
});
