import * as stylex from "@stylexjs/stylex";

const COLUMNS = "44px 1.3fr 1fr 64px";

export const styles = stylex.create({
  table: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "var(--hb-color-surface)",
  },
  head: {
    display: "grid",
    gridTemplateColumns: COLUMNS,
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-border)",
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "var(--hb-color-text-secondary)",
    backgroundColor: "var(--hb-color-surface-subtle)",
  },
  row: {
    display: "grid",
    gridTemplateColumns: COLUMNS,
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: "10px 14px",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-border)",
    textAlign: "start",
    cursor: "pointer",
    backgroundColor: { default: "var(--hb-color-surface)", ":hover": "var(--hb-color-surface-subtle)" },
  },
  rowActive: {
    backgroundColor: "var(--hb-color-accent-subtle, oklch(0.95 0.03 155))",
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: "cover",
    backgroundColor: "var(--hb-color-surface-subtle)",
  },
  thumbEmpty: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "var(--hb-color-surface-subtle)",
  },
  nameCell: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  name: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  breed: {
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
  count: {
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
    textAlign: "end",
  },
  empty: {
    padding: "40px 16px",
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.9375rem",
  },
});
