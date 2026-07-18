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
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBlock: 18,
    flexShrink: 0,
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
  // The list column is a bordered, scrollable table container.
  listCol: {
    minHeight: 0,
    height: { [WIDE]: "100%" },
    overflowY: { [WIDE]: "auto" },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 14,
    backgroundColor: "var(--hb-color-surface)",
  },
  formCol: {
    minHeight: 0,
    height: { [WIDE]: "100%" },
    overflowY: { [WIDE]: "auto" },
  },
});
