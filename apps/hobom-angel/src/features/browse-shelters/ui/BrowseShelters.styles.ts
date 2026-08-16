import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

// The directory content lifts in on mount; stilled under reduced-motion.
const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(10px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingBlock: "clamp(24px, 4vw, 40px)",
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    [REDUCE]: { animationName: "none" },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    // Overline + 3px×24px accent left-rule (design signature).
    paddingLeft: 16,
    position: "relative",
    marginBottom: "var(--hb-angel-space-header)",
    "::before": {
      content: "''",
      position: "absolute",
      insetInlineStart: 0,
      top: 4,
      width: 3,
      height: 24,
      borderRadius: "var(--hb-angel-radius-pill)",
      backgroundColor: "var(--hb-color-accent)",
    },
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  title: {
    margin: 0,
    fontSize: { default: "1.5rem", [TABLET]: "1.625rem" },
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
  // Region filter and the grid/map toggle: side by side on tablet+, stacked on
  // phones (filter scrolls horizontally, toggle pinned to the right).
  controls: {
    display: "flex",
    flexDirection: { default: "column", [TABLET]: "row" },
    alignItems: { default: "stretch", [TABLET]: "center" },
    justifyContent: { [TABLET]: "space-between" },
    gap: { default: 4, [TABLET]: 12 },
  },
  viewToggle: {
    alignSelf: { default: "flex-end", [TABLET]: "auto" },
    marginBlockEnd: { default: 12, [TABLET]: 0 },
  },
  // Result count as a quiet green-tint proof chip.
  count: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginBlock: 20,
    paddingInline: 12,
    paddingBlock: 6,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-angel-green-deep)",
    fontSize: "0.875rem",
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
  },
});
