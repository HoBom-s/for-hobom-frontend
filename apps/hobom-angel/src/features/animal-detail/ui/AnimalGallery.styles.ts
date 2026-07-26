import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  hero: {
    borderRadius: "var(--hb-angel-radius-card)",
    overflow: "hidden",
  },
  thumbs: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  thumb: {
    width: 64,
    padding: 0,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  thumbActive: {
    borderColor: "var(--hb-color-accent)",
  },
});
