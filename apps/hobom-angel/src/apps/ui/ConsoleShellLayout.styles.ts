import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 900px)";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: { default: "column", [DESKTOP]: "row" },
    minHeight: "100dvh",
    // White content area; the sidebar keeps its own light-gray rail below.
    backgroundColor: "var(--hb-color-surface)",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    width: { default: "100%", [DESKTOP]: 240 },
    boxSizing: "border-box",
    padding: 14,
    gap: 10,
    borderInlineEndWidth: { default: 0, [DESKTOP]: 1 },
    borderInlineEndStyle: "solid",
    borderInlineEndColor: "var(--hb-color-border)",
    borderBlockEndWidth: { default: 1, [DESKTOP]: 0 },
    borderBlockEndStyle: "solid",
    borderBlockEndColor: "var(--hb-color-border)",
    // Light-gray console rail so the active (white) item reads as raised.
    backgroundColor: "var(--hb-color-surface-subtle)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "6px 8px 10px",
  },
  logo: {
    width: 28,
    height: 28,
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "var(--hb-color-accent)",
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    minWidth: 0,
  },
  brandTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  brandRole: {
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
  nav: {
    display: "flex",
    flexDirection: { default: "row", [DESKTOP]: "column" },
    flexWrap: { default: "wrap", [DESKTOP]: "nowrap" },
    gap: 3,
    flex: 1,
  },
  itemLink: {
    display: "block",
    borderRadius: 10,
    textDecoration: "none",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    padding: "9px 12px",
    borderRadius: 10,
    color: "var(--hb-color-text-primary)",
    backgroundColor: { default: "transparent", ":hover": "var(--hb-color-surface)" },
  },
  // Selected menu — filled with the brand green, label/hint go white.
  itemActive: {
    color: "#fff",
    backgroundColor: { default: "var(--hb-color-accent)", ":hover": "var(--hb-color-accent)" },
  },
  itemDisabled: {
    cursor: "default",
    backgroundColor: { default: "transparent", ":hover": "transparent" },
    opacity: 0.55,
  },
  itemLabel: {
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "inherit",
  },
  itemHint: {
    fontSize: "0.75rem",
    color: "inherit",
    opacity: 0.65,
  },
  itemSoon: {
    fontSize: "0.6875rem",
    color: "inherit",
    opacity: 0.5,
  },
  foot: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingTop: 10,
    borderTopWidth: { default: 0, [DESKTOP]: 1 },
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-color-border)",
  },
  scope: {
    paddingInline: 4,
    fontSize: "0.75rem",
    color: "var(--hb-color-text-disabled)",
  },
  // A clear, bordered way back to the consumer app.
  exit: {
    display: "block",
    padding: "9px 12px",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    textAlign: "center",
    fontSize: "0.875rem",
    fontWeight: 600,
    textDecoration: "none",
    color: "var(--hb-color-text-primary)",
    backgroundColor: { default: "var(--hb-color-surface)", ":hover": "var(--hb-color-canvas)" },
  },
  main: {
    flex: 1,
    minWidth: 0,
    padding: "clamp(16px, 4vw, 32px)",
  },
});
