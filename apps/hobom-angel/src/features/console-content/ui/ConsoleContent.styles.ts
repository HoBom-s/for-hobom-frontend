import * as stylex from "@stylexjs/stylex";

const WIDE = "@media (min-width: 1024px)";

export const styles = stylex.create({
  root: {
    width: "100%",
  },
  // Full-width body split 1:1 — form on the left, the list on the right.
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [WIDE]: "1fr 1fr" },
    alignItems: "start",
    gap: 20,
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },
  subtabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBlock: 18,
  },
  tab: {
    padding: "7px 14px",
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "var(--hb-color-text-secondary)",
    backgroundColor: "var(--hb-color-surface)",
  },
  tabActive: {
    color: "#fff",
    borderColor: "var(--hb-color-accent)",
    backgroundColor: "var(--hb-color-accent)",
  },
  tabSoon: {
    opacity: 0.5,
  },
  // Form + list stacked.
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
  },
  heading: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "9px 12px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 10,
    fontSize: "0.9375rem",
    fontFamily: "inherit",
    color: "var(--hb-color-text-primary)",
    backgroundColor: "var(--hb-color-surface)",
    outline: "none",
  },
  textarea: {
    minHeight: 96,
    resize: "vertical",
  },
  check: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-primary)",
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  empty: {
    padding: "36px 16px",
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.9375rem",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "var(--hb-color-border)",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
  },
  rowActive: {
    borderColor: "var(--hb-color-accent)",
    boxShadow: "0 0 0 1px var(--hb-color-accent)",
  },
  rowHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  rowTitle: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  preview: {
    margin: 0,
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  rowActions: {
    display: "flex",
    gap: 4,
  },
  spacer: {
    flex: 1,
  },
});
