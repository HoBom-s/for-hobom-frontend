import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  // The tab strip's own bottom border is the divider; it spans the full content
  // width, and the compose action floats above its right end.
  tabsRow: {
    position: "relative",
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 16,
  },
  action: {
    position: "absolute",
    insetBlockEnd: 8,
    insetInlineEnd: "clamp(16px, 4vw, 32px)",
  },
});
