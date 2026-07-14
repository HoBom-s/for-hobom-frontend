import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 768px)";

export const styles = stylex.create({
  // Three sections side by side (design §02); stacks on narrow screens.
  root: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "repeat(3, 1fr)" },
    gap: 16,
  },
  section: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: "var(--hb-angel-radius-card)",
    padding: 20,
  },
  title: {
    margin: 0,
    marginBottom: 14,
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  // label on the left, value on the right.
  item: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    fontSize: "0.875rem",
  },
  label: {
    color: "var(--hb-color-text-secondary)",
    flexShrink: 0,
  },
  value: {
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
    textAlign: "right",
  },
});
