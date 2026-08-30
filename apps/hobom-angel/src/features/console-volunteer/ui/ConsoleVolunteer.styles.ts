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
  header: {
    marginBottom: 20,
    flexShrink: 0,
    paddingLeft: 14,
    borderLeftWidth: 3,
    borderLeftStyle: "solid",
    borderLeftColor: "var(--hb-color-accent)",
  },
  kicker: {
    display: "block",
    marginBottom: 6,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },
  // Full-width 1:1 body; each column scrolls on its own.
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [WIDE]: "1fr 1fr" },
    alignItems: "start",
    gap: 20,
    flex: { [WIDE]: 1 },
    minHeight: 0,
  },
  col: {
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
