import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 720,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 24,
    paddingBottom: 48,
    display: "flex",
    flexDirection: "column",
    gap: 28,
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },

  // ── Page header: overline kicker + display title ──
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

  // ── Floating profile card (borderless, resting shadow-sm) ──
  profileCard: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
    padding: 24,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  identity: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 },
  nameRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  nickname: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  email: { margin: 0, fontSize: "0.9375rem", color: "var(--hb-color-text-secondary)" },

  // ── Sections with an overline + accent left-rule header ──
  section: { display: "flex", flexDirection: "column", gap: 14 },
  sectionHead: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingInlineStart: 2,
  },
  accentRule: {
    width: 3,
    height: 24,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
    flexShrink: 0,
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },

  // ── Action list: floating card, rows lift subtly on hover ──
  actions: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    overflow: "hidden",
  },
  actionRow: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 8,
    minHeight: 40,
    paddingInline: 20,
    paddingBlock: 15,
    fontSize: "0.9375rem",
    fontWeight: 500,
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    borderWidth: 0,
    borderStyle: "none",
    color: "var(--hb-color-text-primary)",
    backgroundColor: {
      default: "transparent",
      ":hover": "var(--hb-angel-green-tint)",
    },
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    outline: { ":focus-visible": "none" },
    boxShadow: { ":focus-visible": "inset var(--hb-angel-focus-ring)" },
    // Hairline divider between rows (not a card border).
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 20,
      bottom: 0,
      height: 1,
      backgroundColor: "var(--hb-color-border)",
    },
    ":last-child::after": { content: "none" },
  },
  chevron: { marginInlineStart: "auto", color: "var(--hb-color-text-disabled)" },
  danger: {
    color: "var(--hb-angel-urgent)",
    backgroundColor: {
      default: "transparent",
      ":hover": "var(--hb-angel-urgent-tint)",
    },
  },
});
