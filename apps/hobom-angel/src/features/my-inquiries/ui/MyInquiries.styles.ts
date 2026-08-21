import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 760,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 24,
    paddingBottom: 48,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  header: { display: "flex", flexDirection: "column", gap: 8 },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  kickerDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "var(--hb-angel-accent-warm)",
  },
  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: 0,
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: 12,
    borderRadius: "var(--hb-angel-radius-card)",
    border: "1px solid var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
    textDecoration: "none",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    transform: { default: "none", ":hover": "translateY(-2px)" },
    boxShadow: { default: "var(--hb-angel-shadow-sm)", ":hover": "var(--hb-angel-shadow-md)" },
    [REDUCE]: { transitionProperty: "none" },
  },
  thumb: {
    flexShrink: 0,
    width: 56,
    height: 56,
    borderRadius: "var(--hb-angel-radius-md)",
    objectFit: "cover",
  },
  thumbFallback: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--hb-angel-surface-alt)",
    color: "var(--hb-color-text-disabled)",
  },
  info: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  name: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  date: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  chevron: {
    flexShrink: 0,
    color: "var(--hb-color-text-disabled)",
  },
});
