import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    insetInlineStart: "50%",
    insetBlockStart: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 500,
    padding: "16px 20px",
    borderRadius: 12,
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.16)",
  },
});
