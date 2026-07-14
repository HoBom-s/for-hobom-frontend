import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  count: {
    marginBlock: 16,
  },
  card: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: "var(--hb-angel-radius-card)",
    overflow: "hidden",
    backgroundColor: "var(--hb-color-surface)",
  },
  // Sizes the photo Skeleton to a square via intrinsic ratio.
  photo: {
    paddingTop: "100%",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 12,
  },
});
