import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 960px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const floatUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(16px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  // ── Hero: asymmetric split (identity ⟂ cover photo), floating over a warm wash ──
  hero: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1fr 0.9fr" },
    alignItems: "stretch",
    gap: { default: 20, [DESKTOP]: 36 },
    padding: { default: 20, [TABLET]: 28, [DESKTOP]: 36 },
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundImage: "var(--hb-angel-hero-wash)",
    boxShadow: "var(--hb-angel-shadow-md)",
    animationName: floatUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },

  // ── Identity column ──
  identity: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
  },
  avatarRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: "var(--hb-angel-radius-md)",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "linear-gradient(135deg, var(--hb-angel-green-tint-strong) 0%, var(--hb-angel-warm-tint) 100%)",
    color: "var(--hb-angel-green-deep)",
    fontSize: "1.5rem",
    fontWeight: 800,
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  name: {
    margin: 0,
    marginTop: 2,
    fontSize: { default: "1.625rem", [TABLET]: "1.875rem", [DESKTOP]: "2rem" },
    lineHeight: 1.15,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
    overflowWrap: "anywhere",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    height: 28,
    paddingInline: 12,
    borderRadius: "var(--hb-angel-radius-pill)",
    fontSize: "0.75rem",
    fontWeight: 700,
    lineHeight: 1,
  },
  chipVerified: {
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-angel-green-deep)",
  },
  chipTrust: {
    backgroundColor: "var(--hb-angel-warm-tint)",
    color: "var(--hb-angel-accent-warm-contrast)",
  },
  address: {
    margin: 0,
    marginTop: 16,
    fontSize: "0.9375rem",
    lineHeight: 1.55,
    color: "var(--hb-color-text-secondary)",
  },
  follow: {
    marginTop: 20,
    display: "flex",
  },

  // ── Cover column ──
  cover: {
    position: "relative",
    borderRadius: "var(--hb-angel-radius-md)",
    overflow: "hidden",
    boxShadow: "var(--hb-angel-shadow-sm)",
    minHeight: { default: 160, [DESKTOP]: "auto" },
  },
  coverScrim: {
    position: "absolute",
    inset: 0,
    backgroundImage: "var(--hb-angel-photo-scrim)",
    pointerEvents: "none",
  },
  // Branded fallback tile — green-tint → warm-tint, never bare grey.
  coverEmpty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: "16 / 9",
    backgroundImage:
      "linear-gradient(135deg, var(--hb-angel-green-tint) 0%, var(--hb-angel-warm-tint) 100%)",
    fontSize: "2.5rem",
    opacity: 0.9,
  },
  // Floating proof chip — one calm trust signal over the photo.
  proof: {
    position: "absolute",
    left: 14,
    bottom: 14,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    paddingBlock: 10,
    paddingInline: 14,
    borderRadius: "var(--hb-angel-radius-sm)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-lg)",
  },
  proofValue: {
    fontSize: "0.9375rem",
    fontWeight: 800,
    color: "var(--hb-color-accent-dark)",
  },
  proofLabel: {
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
});
