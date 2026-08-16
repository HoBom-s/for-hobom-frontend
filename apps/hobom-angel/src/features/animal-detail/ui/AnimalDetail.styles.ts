import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 20,
    paddingBottom: 56,
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  crumbLink: {
    color: "var(--hb-color-text-secondary)",
    textDecoration: { default: "none", ":hover": "underline" },
    borderRadius: "var(--hb-angel-radius-sm)",
    transitionProperty: "color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":hover": { color: "var(--hb-color-accent-dark)" },
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
  },
  crumbCurrent: {
    color: "var(--hb-color-text-primary)",
    fontWeight: 600,
  },
  // Asymmetric split — gallery leads, sticky apply panel trails; stacks < 1024.
  topGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1.35fr 1fr" },
    gap: { default: 20, [DESKTOP]: 32 },
    alignItems: "start",
  },

  // Floating intro card (retire the flat 1px border → resting elevation).
  intro: {
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    padding: "clamp(20px, 3vw, 28px)",
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  // Overline kicker + accent left-rule header block.
  introHead: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 14,
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  introTitle: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: 0,
    fontSize: "1.375rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
    "::before": {
      content: "''",
      display: "block",
      width: 3,
      height: 24,
      borderRadius: "var(--hb-angel-radius-pill)",
      backgroundColor: "var(--hb-color-accent)",
    },
  },
  introBody: {
    margin: 0,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
    whiteSpace: "pre-line",
  },
});
