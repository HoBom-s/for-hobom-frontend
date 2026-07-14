import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  // Pinned to the top of the scrolling content region so the animal grid
  // scrolls underneath it (design: "스크롤 시 그림자 상승").
  root: {
    position: "sticky",
    top: 0,
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    backgroundColor: "var(--hb-color-surface)",
    paddingBlockStart: 20,
    paddingBlockEnd: 12,
    boxShadow: "0 6px 12px -12px rgba(30,45,55,0.5)",
  },
  searchRow: {
    display: "flex",
    gap: 10,
  },
  bar: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  // Sort + view-mode are desktop-only niceties; below 1024 they'd crowd the
  // filter row (and are placeholders for now), so hide them on small screens.
  right: {
    display: { default: "none", [DESKTOP]: "flex" },
    alignItems: "center",
    gap: 10,
    marginInlineStart: "auto",
  },
  sortTrigger: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 38,
    paddingInline: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 11,
    backgroundColor: "var(--hb-color-surface)",
    fontSize: "0.8438rem",
    fontWeight: 500,
    fontFamily: "inherit",
    color: "var(--hb-color-text-primary)",
    cursor: "pointer",
    outline: {
      default: "none",
      ":focus-visible": "2px solid var(--hb-color-accent)",
    },
  },
  sortCaret: {
    fontSize: "0.7rem",
    color: "var(--hb-color-text-secondary)",
  },
});
