import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  brandIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: "var(--hb-color-accent)",
    color: "#ffffff",
    fontSize: "0.9rem",
  },
});
