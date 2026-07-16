import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 900px)";

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 16,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  header: { display: "flex", flexDirection: "column", gap: 6 },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  subtitle: { margin: 0, fontSize: "0.9375rem", color: "var(--hb-color-text-secondary)" },
  controls: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  listView: { maxWidth: 680, width: "100%" },
  // Calendar on the left (wider), the selected day's events on the right.
  board: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1.4fr 1fr" },
    gap: 24,
    alignItems: "start",
  },
  listCol: { display: "flex", flexDirection: "column", gap: 12, minHeight: 0 },
  dayTitle: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  // Cap the day/upcoming feed so a long list scrolls in place instead of
  // stretching the column past the calendar. Scrollbar hidden for a clean edge.
  scrollArea: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxHeight: 560,
    overflowY: "auto",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
  },
});
