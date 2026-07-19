import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  thumb: {
    display: "block",
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: "cover",
    backgroundColor: "var(--hb-color-surface-subtle)",
  },
  thumbEmpty: {
    display: "block",
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
  },
  breed: {
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
  empty: {
    padding: "40px 16px",
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.9375rem",
  },
});
