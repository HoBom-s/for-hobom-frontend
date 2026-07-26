import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    marginBlock: 16,
    // The segmented pill can exceed a phone's width — let the (inline-flex) pill
    // keep its size and scroll sideways instead of overflowing the screen.
    maxWidth: "100%",
    overflowX: "auto",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
  },
});
