import * as stylex from "@stylexjs/stylex";

const WIDE = "@media (min-width: 1024px)";
const MID = "@media (min-width: 640px)";

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
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
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
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
  },
  cardLabel: {
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
  cardValue: {
    marginTop: 2,
    fontSize: "1.75rem",
    fontWeight: 700,
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
  captionUp: {
    color: "var(--hb-color-accent-dark, oklch(0.46 0.08 155))",
  },
  captionDown: {
    color: "var(--hb-color-danger, oklch(0.55 0.18 25))",
  },
  chartCard: {
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
  },
  chartTitle: {
    margin: "0 0 8px",
    fontSize: "0.8125rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
});
