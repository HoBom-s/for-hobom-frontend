import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  section: { paddingBlock: { default: 48, [DESKTOP]: 64 }, paddingInline: "clamp(16px, 4vw, 40px)" },
  inner: { maxWidth: 1120, marginInline: "auto" },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  title: {
    margin: 0,
    fontSize: { default: "1.375rem", [DESKTOP]: "1.625rem" },
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  filters: { display: "flex", gap: 8 },
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "repeat(2, 1fr)", [DESKTOP]: "repeat(4, 1fr)" },
    gap: { default: 14, [TABLET]: 20 },
  },
});
