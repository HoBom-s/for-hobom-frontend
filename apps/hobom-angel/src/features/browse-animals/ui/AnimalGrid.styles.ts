import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  grid: {
    display: "grid",
    // 2 columns on phones, 3 on tablets, 4 on desktop (design §01).
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [TABLET]: "repeat(3, 1fr)",
      [DESKTOP]: "repeat(4, 1fr)",
    },
    gap: 14,
  },

  // Branded empty state — a green-tint → warm-tint tile, never bare grey.
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 8,
    paddingBlock: "clamp(48px, 8vw, 72px)",
    paddingInline: 24,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundImage:
      "linear-gradient(140deg, var(--hb-angel-green-tint) 0%, var(--hb-angel-warm-tint) 100%)",
  },
  emptyGlyph: {
    fontSize: "2rem",
    lineHeight: 1,
  },
  emptyTitle: {
    margin: 0,
    fontSize: "1.0625rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  emptyText: {
    margin: 0,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },

  more: {
    paddingBlock: 20,
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.875rem",
  },
});
