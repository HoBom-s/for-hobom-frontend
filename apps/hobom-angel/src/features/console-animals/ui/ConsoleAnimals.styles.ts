import * as stylex from "@stylexjs/stylex";

const WIDE = "@media (min-width: 1024px)";

export const styles = stylex.create({
  root: {
    width: "100%",
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
  // Table on the left, register/edit form on the right (§7.1).
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [WIDE]: "1fr 1fr" },
    alignItems: "start",
    gap: 20,
  },
});
