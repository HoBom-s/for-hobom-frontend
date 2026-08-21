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
    gap: 12,
  },
  // Borderless floating card — resting shadow-sm, hover lifts to shadow-md.
  section: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 22,
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    padding: "22px 24px",
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: {
      animationName: "none",
    },
  },
  head: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 14,
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--hb-color-text-disabled)",
  },
  // Overline kicker + accent left-rule.
  title: {
    display: "none",
    margin: 0,
    fontSize: "1.0625rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
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
