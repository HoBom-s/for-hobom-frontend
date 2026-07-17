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
    gap: 8,
  },
  more: {
    paddingBlock: 20,
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.875rem",
  },
});
