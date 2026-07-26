import * as stylex from "@stylexjs/stylex";

const WIDE = "@media (min-width: 768px)";

export const styles = stylex.create({
  // Reputation summary: the big score beside the star histogram.
  summary: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [WIDE]: "auto 1fr" },
    gap: { default: 16, [WIDE]: 28 },
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface-subtle)",
  },
  score: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  average: {
    fontSize: "2.75rem",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  count: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  bars: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
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
    color: "var(--hb-color-text-secondary)",
  },
  barTrack: {
    position: "relative",
    flex: 1,
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "var(--hb-color-border)",
  },
  barFill: {
    position: "absolute",
    insetBlock: 0,
    insetInlineStart: 0,
    borderRadius: 999,
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
    color: "var(--hb-color-accent)",
    fontSize: "0.9375rem",
    letterSpacing: "1px",
  },
  starMuted: {
    color: "var(--hb-color-border)",
  },
  // Review card.
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
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
    lineHeight: 1.6,
    color: "var(--hb-color-text-primary)",
    whiteSpace: "pre-line",
  },
  more: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 4,
  },
});
