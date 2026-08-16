import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  grid: {
    display: "grid",
    // 1 column on phones, 2 on tablets, 3 on desktop (design §3.5).
    gridTemplateColumns: {
      default: "repeat(1, 1fr)",
      [TABLET]: "repeat(2, 1fr)",
      [DESKTOP]: "repeat(3, 1fr)",
    },
    gap: { default: 16, [DESKTOP]: 20 },
  },
  // Branded empty state: green-tint→warm-tint tile, never bare grey.
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingBlock: "clamp(48px, 8vw, 72px)",
    paddingInline: 24,
    textAlign: "center",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundImage:
      "linear-gradient(135deg, var(--hb-angel-green-tint) 0%, var(--hb-angel-warm-tint) 100%)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  emptyIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    fontSize: "1.5rem",
  },
  emptyText: {
    margin: 0,
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
  more: {
    paddingBlock: 20,
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.875rem",
  },
});
