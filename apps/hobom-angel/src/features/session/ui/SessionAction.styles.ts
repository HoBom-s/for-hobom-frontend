import * as stylex from "@stylexjs/stylex";

const REDUCED = "@media (prefers-reduced-motion: reduce)";

const pulse = stylex.keyframes({
  "0%, 100%": { opacity: 0.35 },
  "50%": { opacity: 0.7 },
});

export const styles = stylex.create({
  skeleton: {
    display: "inline-block",
    width: 62,
    height: 28,
    borderRadius: 999,
    backgroundColor: "var(--hb-color-border)",
    animationName: pulse,
    animationDuration: { default: "1.2s", [REDUCED]: "0s" },
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
  },
});
