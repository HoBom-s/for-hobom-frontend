import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
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
  row: {
    display: "flex",
    gap: 10,
  },
  rowItem: {
    flex: 1,
    minWidth: 0,
  },
});
