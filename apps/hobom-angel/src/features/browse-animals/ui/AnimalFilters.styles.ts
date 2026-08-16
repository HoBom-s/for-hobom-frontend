import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  // Pinned to the top of the scrolling content region so the animal grid
  // scrolls underneath it. Floating warm surface (retired the flat hairline):
  // a rounded panel resting on shadow-sm, lifting to shadow-md once pinned.
  root: {
    position: "sticky",
    top: 12,
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBlockStart: 8,
    backgroundColor: "var(--hb-color-surface)",
    borderRadius: "var(--hb-angel-radius-md)",
    padding: "clamp(10px, 1.5vw, 12px)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  // A single wrap toolbar: search form on the left, segmented groups inline,
  // sort + view cluster pushed to the far end. Wraps naturally below 1024.
  bar: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: 8,
    rowGap: 8,
  },
  // Keyword search form — grows to fill, capped so the toolbar stays balanced.
  search: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: 1,
    minWidth: 220,
    maxWidth: 340,
  },
  searchField: {
    flex: 1,
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
    minHeight: 40,
    paddingInline: 14,
    borderWidth: 0,
    borderRadius: "var(--hb-angel-radius-control)",
    backgroundColor: "var(--hb-angel-surface-alt)",
    fontSize: "0.8438rem",
    fontWeight: 600,
    fontFamily: "inherit",
    color: "var(--hb-color-text-primary)",
    cursor: "pointer",
    transitionProperty: "box-shadow, background-color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    outline: "none",
    boxShadow: {
      default: "none",
      ":hover": "var(--hb-angel-shadow-sm)",
      ":focus-visible": "var(--hb-angel-focus-ring)",
    },
  },
  sortCaret: {
    marginInlineStart: -2,
    color: "var(--hb-color-text-secondary)",
  },
});
