import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

const floatUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(16px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    textAlign: "center",
    backgroundImage: "var(--hb-angel-hero-wash)",
  },
  block: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "var(--hb-angel-measure)",
    animationName: floatUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  disc: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 88,
    height: 88,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    boxShadow: "var(--hb-angel-shadow-md)",
    fontSize: "2rem",
    lineHeight: 1,
  },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
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
    marginTop: 10,
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  desc: {
    margin: 0,
    marginTop: 12,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "17px",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
});
