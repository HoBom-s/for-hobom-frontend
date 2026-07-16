import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  metaRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  shelterLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    textDecoration: "none",
    color: "var(--hb-color-text-secondary)",
  },
  clamp: {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  more: {
    alignSelf: "flex-start",
    padding: 0,
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: "transparent",
    color: "var(--hb-color-accent)",
    fontSize: "0.8125rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  captionRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
});
