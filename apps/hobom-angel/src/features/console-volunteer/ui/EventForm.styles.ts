import * as stylex from "@stylexjs/stylex";

const NARROW = "@media (max-width: 480px)";

export const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    padding: { default: 20, [NARROW]: 16 },
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  heading: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
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
    minHeight: 40,
    boxSizing: "border-box",
    padding: "9px 12px",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: "var(--hb-angel-radius-control)",
    fontSize: "0.9375rem",
    fontFamily: "inherit",
    color: "var(--hb-color-text-primary)",
    backgroundColor: "var(--hb-angel-surface-alt)",
    outline: "none",
    boxShadow: { default: "none", ":focus": "var(--hb-angel-focus-ring)" },
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
