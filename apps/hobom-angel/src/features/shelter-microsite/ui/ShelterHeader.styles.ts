import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  row: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--hb-color-success-subtle)",
    color: "var(--hb-color-success)",
    fontSize: "1.5rem",
    fontWeight: 700,
  },
});
