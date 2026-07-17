import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingBlock: 24,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: 0,
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },
  // Region filter and the grid/map toggle: side by side on desktop, stacked on
  // phones (filter scrolls horizontally, toggle pinned to the right).
  controls: {
    display: "flex",
    flexDirection: { default: "column", "@media (min-width: 768px)": "row" },
    alignItems: { default: "stretch", "@media (min-width: 768px)": "center" },
    justifyContent: { "@media (min-width: 768px)": "space-between" },
    gap: { default: 4, "@media (min-width: 768px)": 12 },
  },
  viewToggle: {
    alignSelf: { default: "flex-end", "@media (min-width: 768px)": "auto" },
    marginBlockEnd: { default: 12, "@media (min-width: 768px)": 0 },
  },
  count: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
    marginBlock: 16,
  },
});
