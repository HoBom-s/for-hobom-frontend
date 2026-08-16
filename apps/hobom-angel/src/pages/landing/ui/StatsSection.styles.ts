import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";

export const styles = stylex.create({
  section: {
    paddingBlock: "clamp(24px, 4vw, 40px)",
    paddingInline: "clamp(16px, 4vw, 40px)",
    marginTop: -32,
  },
  card: {
    maxWidth: 1000,
    marginInline: "auto",
    backgroundColor: "var(--hb-color-surface)",
    borderRadius: "var(--hb-angel-radius-card)",
    boxShadow: "var(--hb-angel-shadow-md)",
    paddingBlock: { default: 24, [TABLET]: 32 },
    paddingInline: { default: 16, [TABLET]: 32 },
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
    fontSize: { default: "1.75rem", [TABLET]: "2.5rem" },
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-accent-dark)",
    fontVariantNumeric: "tabular-nums",
  },
  label: {
    marginTop: 6,
    fontSize: { default: "0.75rem", [TABLET]: "0.875rem" },
    color: "var(--hb-color-text-secondary)",
  },
});
