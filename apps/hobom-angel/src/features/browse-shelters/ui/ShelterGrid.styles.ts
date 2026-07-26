import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  grid: {
    display: "grid",
    // 1 column on phones, 2 on tablets, 3 on desktop (design §3.5).
    gridTemplateColumns: {
      default: "repeat(1, 1fr)",
      [TABLET]: "repeat(2, 1fr)",
      [DESKTOP]: "repeat(3, 1fr)",
    },
    gap: { default: 12, [DESKTOP]: 16 },
  },
  empty: {
    paddingBlock: 64,
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.9375rem",
  },
  more: {
    paddingBlock: 20,
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.875rem",
  },
});
