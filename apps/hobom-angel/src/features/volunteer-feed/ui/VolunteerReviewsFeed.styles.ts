import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    width: "100%",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 24,
  },
  // Anchored feed heading, capped to the same 1120 measure as the grid.
  header: {
    maxWidth: 1120,
    marginInline: "auto",
    width: "100%",
    boxSizing: "border-box",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 24,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  kickerRow: { display: "flex", alignItems: "center", gap: 8 },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  // Marigold dot — the single HOPE cue anchoring the heading.
  hopeDot: {
    flexShrink: 0,
    width: 6,
    height: 6,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-accent-warm)",
  },
  titleRow: { display: "flex", alignItems: "center", gap: 12 },
  rule: {
    flexShrink: 0,
    width: 3,
    height: 24,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },
  title: {
    margin: 0,
    fontSize: "1.625rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  // The grid scrolls within a capped area, so the section tabs stay put.
  scroll: {
    maxHeight: "calc(100dvh - 170px)",
    overflowY: "auto",
    paddingBottom: 16,
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
  },
  empty: { display: "flex", justifyContent: "center", paddingTop: 24, paddingBottom: 48 },
  // A dense square-thumbnail grid filling the width from the left.
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [TABLET]: "repeat(3, 1fr)",
      [DESKTOP]: "repeat(4, 1fr)",
    },
    gap: { default: 12, [TABLET]: 16 },
  },
  more: {
    paddingBlock: 24,
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.875rem",
  },
});
