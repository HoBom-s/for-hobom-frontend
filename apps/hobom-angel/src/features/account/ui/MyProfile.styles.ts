import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";
const DESKTOP = "@media (min-width: 900px)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    padding: { default: "22px 18px 40px", [DESKTOP]: "34px 40px 60px" },
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "repeat(2,1fr)" },
    gap: 14,
    backgroundColor: "var(--hb-color-surface)",
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },

  // ── Page header: overline kicker + display title ──
  header: { display: "none" },
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
    gridColumn: { [DESKTOP]: "1 / -1" },
    display: "flex",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
    padding: 24,
    borderRadius: 26,
    backgroundImage: "var(--hb-angel-cta-gradient)",
    color: "#F2F7F2",
  },
  identity: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 },
  nameRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  nickname: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "#F2F7F2",
  },
  email: { margin: 0, fontSize: "0.8125rem", color: "rgba(242,247,242,0.75)" },

  // ── Sections with an overline + accent left-rule header ──
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    padding: "24px 26px",
    borderRadius: 24,
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
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
    gap: 8,
  },
  actionRow: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 8,
    minHeight: 40,
    paddingInline: 17,
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
      default: "#F8F3EA",
      ":hover": "var(--hb-angel-green-tint)",
    },
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    outline: { ":focus-visible": "none" },
    boxShadow: { ":focus-visible": "inset var(--hb-angel-focus-ring)" },
    borderRadius: 18,
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
