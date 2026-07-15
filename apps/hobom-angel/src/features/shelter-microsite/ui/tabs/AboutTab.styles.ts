import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  // Main content + sidebar (§04 design: 1.5fr / 1fr).
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1.5fr 1fr" },
    gap: 24,
    alignItems: "start",
  },
  preview: {
    display: "grid",
    gridTemplateColumns: { default: "repeat(2, 1fr)", [DESKTOP]: "repeat(4, 1fr)" },
    gap: 12,
  },
});
