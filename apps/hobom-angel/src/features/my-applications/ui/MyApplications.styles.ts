import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
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
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [TABLET]: "repeat(3, 1fr)",
      [DESKTOP]: "repeat(4, 1fr)",
    },
    gap: { default: 12, [DESKTOP]: 16 },
  },
  // A grid cell: the card plus an optional "후기 남기기" action beneath it.
  cell: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  // The one warm (HOPE) moment on this surface — leaving a review.
  reviewCta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
    padding: "9px 12px",
    borderRadius: "var(--hb-radius-control)",
    borderWidth: 0,
    borderStyle: "none",
    fontFamily: "inherit",
    fontSize: "0.8125rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-angel-accent-warm-dark)",
    backgroundColor: {
      default: "var(--hb-angel-warm-tint)",
      ":hover": "var(--hb-angel-warm-tint-strong)",
    },
    cursor: "pointer",
    transitionProperty: "background-color, transform",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease-spring)",
    transform: { default: "none", ":active": "scale(0.97)" },
    outline: { ":focus-visible": "none" },
    boxShadow: { ":focus-visible": "var(--hb-angel-focus-ring)" },
    [REDUCE]: { transform: "none", transitionProperty: "background-color" },
  },
  // Compose dialog.
  composeIntro: {
    margin: "0 0 14px",
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  stars: {
    display: "flex",
    gap: 4,
    marginBottom: 16,
  },
  star: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    minHeight: 40,
    padding: 2,
    border: "none",
    background: "none",
    fontSize: "1.75rem",
    lineHeight: 1,
    color: "var(--hb-color-border)",
    cursor: "pointer",
    transitionProperty: "transform, color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease-spring)",
    transform: { default: "none", ":active": "scale(1.2)" },
    [REDUCE]: { transform: "none", transitionProperty: "color" },
  },
  starOn: {
    color: "var(--hb-angel-accent-warm)",
  },
});
