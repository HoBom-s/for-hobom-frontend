import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  empty: {
    padding: "40px 16px",
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
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    backgroundColor: { default: "var(--hb-color-surface)", ":hover": "var(--hb-color-surface-subtle)" },
    textAlign: "start",
    cursor: "pointer",
  },
  rowActive: {
    borderColor: "var(--hb-color-accent)",
    boxShadow: "0 0 0 1px var(--hb-color-accent)",
  },
  name: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  meta: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  spacer: {
    flex: 1,
  },
});
