import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";

export const styles = stylex.create({
  section: { paddingBlock: 20, paddingInline: "clamp(16px, 4vw, 40px)" },
  card: {
    maxWidth: 1120,
    marginInline: "auto",
    backgroundColor: "var(--hb-angel-surface-alt)",
    borderRadius: "var(--hb-angel-radius-card)",
    paddingBlock: { default: 24, [TABLET]: 28 },
    paddingInline: 16,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  item: {
    textAlign: "center",
    borderLeftWidth: { default: 0, [TABLET]: 1 },
    borderLeftStyle: "solid",
    borderLeftColor: "var(--hb-color-border)",
  },
  itemFirst: { borderLeftWidth: 0 },
  value: {
    fontSize: { default: "1.5rem", [TABLET]: "1.875rem" },
    fontWeight: 800,
    color: "var(--hb-color-accent-dark)",
    fontVariantNumeric: "tabular-nums",
  },
  label: {
    marginTop: 6,
    fontSize: { default: "0.75rem", [TABLET]: "0.875rem" },
    color: "var(--hb-color-text-secondary)",
  },
});
