import * as stylex from "@stylexjs/stylex";

const WIDE = "@media (min-width: 1024px)";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: { [WIDE]: "100%" },
    minHeight: 0,
  },
  // Section header block with an accent left-rule (kicker + title + subtitle).
  header: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    paddingLeft: 14,
    "::before": {
      content: "''",
      position: "absolute",
      left: 0,
      top: 4,
      width: 3,
      height: 24,
      borderRadius: "var(--hb-angel-radius-pill)",
      backgroundColor: "var(--hb-color-accent)",
    },
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent)",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: 0,
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },
  // Sticky sub-toolbar living inside the page flow: count + register CTA.
  toolbar: {
    position: "sticky",
    top: 0,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBlock: 16,
    paddingBlock: 8,
    paddingInline: 12,
    flexShrink: 0,
    backgroundColor: "var(--hb-angel-card)",
    borderRadius: "var(--hb-angel-radius-md)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  count: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  countNum: {
    color: "var(--hb-color-accent-dark, var(--hb-color-accent))",
  },
  spacer: {
    flex: 1,
    minWidth: 12,
  },
  registerAction: {
    minHeight: 40,
  },
  // Full-width 1:1 body; each column scrolls on its own (list left, form right).
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [WIDE]: "1fr 1fr" },
    alignItems: "start",
    gap: 20,
    flex: { [WIDE]: 1 },
    minHeight: 0,
  },
  // The list column is a soft-floating, scrollable table card.
  listCol: {
    minHeight: 0,
    height: { [WIDE]: "100%" },
    overflowY: { [WIDE]: "auto" },
    overflowX: "auto",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  formCol: {
    minHeight: 0,
    height: { [WIDE]: "100%" },
    overflowY: { [WIDE]: "auto" },
    // `overflow-y: auto` computes overflow-x to auto as well, so this column is a
    // scroll container that clips at its edges — shaving the cards' hover shadow
    // and selected ring. Pad the scroll box, then pull the padding back out so
    // the cards stay exactly where they were.
    padding: { default: 0, [WIDE]: 8 },
    margin: { default: 0, [WIDE]: -8 },
  },
});
