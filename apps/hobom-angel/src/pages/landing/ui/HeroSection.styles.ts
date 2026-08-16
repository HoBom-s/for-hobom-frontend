import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 960px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const floatUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(16px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  section: {
    backgroundImage: "var(--hb-angel-hero-wash)",
    paddingBlock: { default: "40px 48px", [DESKTOP]: "72px 88px" },
    paddingInline: "clamp(16px, 4vw, 40px)",
  },
  inner: {
    maxWidth: 1120,
    marginInline: "auto",
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1.05fr 0.95fr" },
    alignItems: "center",
    gap: { default: 40, [DESKTOP]: 56 },
  },

  // ── Copy column ──
  copy: {
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "center", [DESKTOP]: "flex-start" },
    textAlign: { default: "center", [DESKTOP]: "left" },
    animationName: floatUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  kickerDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "var(--hb-angel-accent-warm)",
  },
  title: {
    margin: 0,
    marginTop: 18,
    fontSize: { default: "34px", [TABLET]: "44px", [DESKTOP]: "50px" },
    lineHeight: 1.1,
    fontWeight: 700,
    letterSpacing: "-0.025em",
    color: "var(--hb-color-text-primary)",
  },
  lead: {
    margin: 0,
    marginTop: 18,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  cta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 28,
    justifyContent: { default: "center", [DESKTOP]: "flex-start" },
  },

  // ── Photo column ──
  gallery: {
    position: "relative",
    display: { default: "none", [DESKTOP]: "block" },
    aspectRatio: "4 / 3",
    animationName: floatUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationDelay: "80ms",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  photo: {
    position: "absolute",
    borderRadius: "var(--hb-angel-radius-card)",
    objectFit: "cover",
    boxShadow: "var(--hb-angel-shadow-md)",
    outlineWidth: 4,
    outlineStyle: "solid",
    outlineColor: "var(--hb-color-surface)",
  },
  photoMain: { inset: "0 0 12% 20%", width: "80%", height: "88%" },
  photoBack: {
    top: "6%",
    left: 0,
    width: "46%",
    height: "52%",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  proofChip: {
    position: "absolute",
    left: "2%",
    bottom: "4%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    paddingBlock: 12,
    paddingInline: 16,
    borderRadius: "var(--hb-angel-radius-md)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-lg)",
  },
  proofValue: {
    fontSize: "1.375rem",
    fontWeight: 800,
    fontVariantNumeric: "tabular-nums",
    color: "var(--hb-color-accent-dark)",
  },
  proofLabel: { fontSize: "0.75rem", color: "var(--hb-color-text-secondary)" },
});
