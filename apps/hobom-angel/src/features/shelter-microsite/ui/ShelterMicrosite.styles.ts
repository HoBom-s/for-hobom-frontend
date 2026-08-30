import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    maxWidth: 1200,
    marginInline: "auto",
    padding: "clamp(18px, 3vw, 40px)",
    paddingBottom: 60,
    backgroundColor: "var(--hb-color-surface)",
  },
  // A tab panel needs a min-height so switching to a suspending tab doesn't
  // collapse the page height while its data loads.
  panel: {
    minHeight: 240,
    paddingTop: 24,
  },
});
