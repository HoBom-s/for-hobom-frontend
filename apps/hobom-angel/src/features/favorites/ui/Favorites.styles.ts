import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 24,
    paddingBottom: 48,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  header: { display: "flex", flexDirection: "column", gap: 8 },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: 0,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  panel: { paddingTop: 24 },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [TABLET]: "repeat(3, 1fr)",
      [DESKTOP]: "repeat(4, 1fr)",
    },
    gap: { default: 12, [DESKTOP]: 16 },
  },

  // ── Followed-shelter rows: borderless floating cards that lift on hover ──
  shelterList: { display: "flex", flexDirection: "column", gap: 12 },
  shelterCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 18px",
    borderRadius: "var(--hb-angel-radius-md)",
    backgroundColor: "var(--hb-color-surface)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    transform: { default: "none", ":hover": "translateY(-2px)" },
    boxShadow: { default: "var(--hb-angel-shadow-sm)", ":hover": "var(--hb-angel-shadow-md)" },
    [REDUCE]: { transform: "none", transitionProperty: "box-shadow" },
  },
  shelterLink: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "inherit",
    textDecoration: "none",
    borderRadius: "var(--hb-angel-radius-sm)",
    outline: { ":focus-visible": "none" },
    boxShadow: { ":focus-visible": "var(--hb-angel-focus-ring)" },
  },
  // Small branded avatar tile standing in for the shelter mark.
  shelterMark: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: "var(--hb-angel-radius-sm)",
    backgroundImage:
      "linear-gradient(135deg, var(--hb-angel-green-tint) 0%, var(--hb-angel-warm-tint) 100%)",
    fontSize: "1.25rem",
  },
  shelterText: { minWidth: 0, display: "flex", flexDirection: "column", gap: 2 },
  shelterName: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  shelterRegion: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  chevron: { marginInlineStart: "auto", color: "var(--hb-color-text-disabled)" },
});
