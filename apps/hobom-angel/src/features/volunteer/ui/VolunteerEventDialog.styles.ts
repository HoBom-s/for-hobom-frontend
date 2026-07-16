import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  chips: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  shelterLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    textDecoration: "none",
    color: "var(--hb-color-text-secondary)",
  },
});
