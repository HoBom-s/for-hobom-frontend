import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(10px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    // Top spacing comes from the sticky filter bar; keep only the bottom.
    paddingBottom: 32,
  },

  // Editorial header: overline kicker + accent left-rule title + warm lead.
  header: {
    display: "flex",
    flexDirection: "column",
    paddingBlockStart: "clamp(16px, 3vw, 28px)",
    paddingBlockEnd: 4,
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
    marginBottom: 6,
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: 0,
    fontSize: { default: "1.5rem", [DESKTOP]: "1.625rem" },
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  // 3px × 24px accent left-rule.
  rule: {
    display: "inline-block",
    flexShrink: 0,
    width: 3,
    height: 24,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },
  lead: {
    margin: 0,
    marginTop: 8,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },

  resultRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginBlockStart: 14,
    marginBlockEnd: 12,
  },
  count: {
    fontSize: "0.875rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
    marginInlineEnd: 4,
  },
});
