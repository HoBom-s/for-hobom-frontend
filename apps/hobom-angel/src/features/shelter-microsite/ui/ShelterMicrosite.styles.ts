import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 16,
    paddingBottom: 40,
  },
  // A tab panel needs a min-height so switching to a suspending tab doesn't
  // collapse the page height while its data loads.
  panel: {
    minHeight: 240,
    paddingTop: 20,
  },
});
