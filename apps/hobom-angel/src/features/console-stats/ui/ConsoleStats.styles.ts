import * as stylex from "@stylexjs/stylex";

const WIDE = "@media (min-width: 1024px)";
const MID = "@media (min-width: 640px)";
const NARROW = "@media (max-width: 639px)";

export const styles = stylex.create({
  // The console main is a fixed pane; this screen owns its own vertical scroll.
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: { [WIDE]: "100%" },
    minHeight: 0,
    overflowY: { [WIDE]: "auto" },
  },
  // Section header: overline kicker + accent left-rule sit above the title.
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
    fontSize: 11,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent)",
  },
  kickerRule: {
    display: "inline-block",
    width: 3,
    height: 24,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: "4px 0 18px",
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [MID]: "repeat(2, 1fr)",
      [WIDE]: "repeat(4, 1fr)",
    },
    gap: 12,
    marginBottom: 16,
  },
  // Soft-float KPI cards: retire the flat 1px border for resting elevation.
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: { default: 16, [NARROW]: 14 },
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  // Korean label kept as-is; kicker color/tracking marks it as a section label.
  cardLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.14em",
    color: "var(--hb-color-accent)",
  },
  cardValue: {
    marginTop: 2,
    fontSize: "1.75rem",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  cardValueAccent: {
    color: "var(--hb-color-accent)",
  },
  caption: {
    marginTop: 2,
    fontSize: "0.6875rem",
    color: "var(--hb-color-text-secondary)",
  },
  // Up = positive trend → green trust; down = attention → urgent.
  captionUp: {
    color: "var(--hb-color-accent-dark)",
  },
  captionDown: {
    color: "var(--hb-angel-urgent)",
  },
  chartCard: {
    padding: 18,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  chartTitle: {
    margin: "0 0 8px",
    fontSize: "0.8125rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  // Guard against bar/label overflow on narrow screens.
  chartScroll: {
    overflowX: "auto",
  },
});
