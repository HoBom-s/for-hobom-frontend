import * as stylex from "@stylexjs/stylex";

const WIDE = "@media (min-width: 768px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

export const styles = stylex.create({
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  // Reputation summary: the big score beside the star histogram — a floating
  // warm-tinted panel (the one emotional moment on this surface).
  summary: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [WIDE]: "auto 1fr" },
    gap: { default: 20, [WIDE]: 32 },
    alignItems: "center",
    padding: { default: 20, [WIDE]: 28 },
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundImage:
      "linear-gradient(135deg, var(--hb-angel-warm-tint) 0%, var(--hb-color-surface) 70%)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  score: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  average: {
    fontSize: "3rem",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
    color: "var(--hb-color-text-primary)",
  },
  count: {
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "var(--hb-color-text-secondary)",
  },
  bars: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    minWidth: 0,
  },
  barRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  barStar: {
    width: 28,
    flexShrink: 0,
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--hb-color-text-secondary)",
  },
  barTrack: {
    position: "relative",
    flex: 1,
    height: 8,
    borderRadius: "var(--hb-angel-radius-pill)",
    overflow: "hidden",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  barFill: {
    position: "absolute",
    insetBlock: 0,
    insetInlineStart: 0,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },
  barCount: {
    width: 24,
    flexShrink: 0,
    textAlign: "end",
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
  stars: {
    display: "inline-flex",
    gap: 1,
    color: "var(--hb-angel-accent-warm)",
    fontSize: "0.9375rem",
    letterSpacing: "1px",
  },
  starMuted: {
    color: "var(--hb-angel-warm-tint-strong)",
  },

  // Review card — borderless floating, warm surface, hover-lift.
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: { default: 16, [WIDE]: 20 },
    borderRadius: "var(--hb-angel-radius-md)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":hover": { transform: "translateY(-3px)", boxShadow: "var(--hb-angel-shadow-md)" },
    [REDUCE]: { transitionProperty: "none", ":hover": { transform: "none" } },
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  headSpacer: {
    flex: 1,
  },
  date: {
    fontSize: "0.75rem",
    color: "var(--hb-color-text-disabled)",
  },
  body: {
    margin: 0,
    fontSize: "0.9375rem",
    lineHeight: 1.65,
    color: "var(--hb-color-text-primary)",
    whiteSpace: "pre-line",
  },
  more: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 4,
  },
});
