import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 1200,
    marginInline: "auto",
    padding: { default: "22px 18px 40px", [DESKTOP]: "34px 40px 60px" },
    display: "flex",
    flexDirection: "column",
    gap: 26,
    backgroundColor: "var(--hb-color-surface)",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    fontSize: "0.78125rem",
    color: "#8A9187",
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
    gap: { default: 20, [DESKTOP]: 26 },
    alignItems: "start",
  },

  // Floating intro card (retire the flat 1px border → resting elevation).
  intro: {
    borderRadius: 24,
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    padding: "26px 28px",
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
    marginBottom: 12,
  },
  kicker: {
    display: "none",
  },
  introTitle: {
    margin: 0,
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.25rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  introBody: {
    margin: 0,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "0.9375rem",
    lineHeight: 1.8,
    color: "var(--hb-color-text-secondary)",
    whiteSpace: "pre-line",
  },
});
