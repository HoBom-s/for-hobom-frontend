import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 16,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  header: { display: "flex", flexDirection: "column", gap: 6 },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  subtitle: { margin: 0, fontSize: "0.9375rem", color: "var(--hb-color-text-secondary)" },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [TABLET]: "repeat(3, 1fr)",
      [DESKTOP]: "repeat(4, 1fr)",
    },
    gap: { default: 12, [DESKTOP]: 16 },
    paddingTop: 8,
  },
  // Application kind · status, overlaid on the card photo (top-left).
  badge: {
    position: "absolute",
    insetBlockStart: 8,
    insetInlineStart: 8,
    zIndex: 1,
  },
});
