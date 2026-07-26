import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "var(--hb-color-text-secondary)",
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
    minHeight: 80,
    resize: "vertical",
  },
  row: {
    display: "flex",
    gap: 10,
  },
  rowItem: {
    flex: 1,
    minWidth: 0,
  },
  checks: {
    display: "flex",
    gap: 16,
  },
  check: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-primary)",
    cursor: "pointer",
  },
});
