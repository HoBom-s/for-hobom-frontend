import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 768px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  // Three sections side by side (design §02); stacks on narrow screens.
  root: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "repeat(3, 1fr)" },
    gap: 16,
  },
  // Borderless floating card — resting shadow-sm, hover lifts to shadow-md.
  section: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    padding: "clamp(20px, 2.4vw, 24px)",
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":hover": { transform: "translateY(-3px)", boxShadow: "var(--hb-angel-shadow-md)" },
    [REDUCE]: {
      animationName: "none",
      transitionProperty: "none",
      ":hover": { transform: "none" },
    },
  },
  head: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 16,
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  // Overline kicker + accent left-rule.
  title: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: 0,
    fontSize: "1.0625rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
    "::before": {
      content: "''",
      display: "block",
      width: 3,
      height: 20,
      borderRadius: "var(--hb-angel-radius-pill)",
      backgroundColor: "var(--hb-color-accent)",
    },
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  // label on the left, value on the right; hairline divider between rows.
  item: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    paddingBlock: 10,
    fontSize: "0.9375rem",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-angel-surface-alt)",
    ":last-child": { borderBottomWidth: 0, paddingBottom: 0 },
    ":first-child": { paddingTop: 0 },
  },
  label: {
    color: "var(--hb-color-text-secondary)",
    flexShrink: 0,
  },
  value: {
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
    textAlign: "right",
  },
});
