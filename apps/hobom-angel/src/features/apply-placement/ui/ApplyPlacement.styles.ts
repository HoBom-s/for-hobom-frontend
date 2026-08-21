import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    minHeight: "100%",
    maxWidth: 712,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: { default: 22, [DESKTOP]: 34 },
    paddingBottom: { default: 16, [DESKTOP]: 60 },
    display: "flex",
    flexDirection: "column",
    gap: 20,
    // Warm-neutral canvas so the floating question card reads as elevated.
    backgroundColor: "var(--hb-color-surface)",
  },
  // Grows on mobile so the nav sits at the screen bottom; natural height on
  // desktop so the nav sits just below the question.
  funnelArea: {
    flex: { default: 1, [DESKTOP]: "0 1 auto" },
  },
  // Resting floating panel wrapping the survey step — no hover lift (not
  // interactive). Fades up once on mount.
  funnelCard: {
    backgroundColor: "var(--hb-angel-card)",
    borderRadius: 26,
    boxShadow: "0 1px 2px rgba(34,49,42,0.05),0 20px 50px -34px rgba(34,49,42,0.35)",
    padding: { default: "26px 22px", "@media (min-width: 768px)": "34px 36px" },
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  // Kicker + accent left-rule mini-header (matches WriteReview / landing).
  titleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    flex: 1,
    minWidth: 0,
  },
  kicker: {
    fontSize: "0.78125rem",
    fontWeight: 400,
    letterSpacing: 0,
    color: "#8A9187",
  },
  kickerDot: { display: "none" },
  titleRow: { display: "flex", alignItems: "center", gap: 12 },
  rule: {
    flexShrink: 0,
    width: 3,
    height: 24,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },
  back: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 38,
    height: 38,
    borderRadius: "var(--hb-angel-radius-pill)",
    color: "var(--hb-color-text-primary)",
    backgroundColor: { default: "var(--hb-angel-card)", ":hover": "var(--hb-angel-surface-alt)" },
    boxShadow: "var(--hb-angel-shadow-sm)",
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
    [REDUCE]: { transitionProperty: "none" },
  },
  title: {
    margin: 0,
    fontFamily: "var(--hb-font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },

  // ── Progress ────────────────────────────────────────────
  progressRow: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  stepLabel: {
    fontSize: "0.8125rem",
    fontWeight: 400,
    color: "var(--hb-color-text-secondary)",
  },
  stepNum: {
    fontVariantNumeric: "tabular-nums",
  },
  progressTrack: {
    width: "100%",
    height: 5,
    display: "flex",
    gap: 5,
  },
  progressBar: {
    flex: 1,
    height: "100%",
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-border)",
  },
  progressBarOn: { backgroundColor: "var(--hb-color-accent)" },

  // ── Step / fields ───────────────────────────────────────
  step: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  emptyNote: {
    margin: 0,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
    padding: 16,
    borderRadius: "var(--hb-angel-radius-md)",
    backgroundColor: "var(--hb-angel-warm-tint)",
  },

  // ── Nav (floating sticky action bar on mobile, inline on desktop) ─
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    // Floating sticky bottom bar on mobile / tablet (< 1024px).
    position: { default: "sticky", [DESKTOP]: "static" },
    bottom: 0,
    backgroundColor: { default: "var(--hb-color-surface)", [DESKTOP]: "transparent" },
    boxShadow: { default: "var(--hb-angel-shadow-md)", [DESKTOP]: "none" },
    // Bleed to the full viewport width, cancelling the root gutter.
    marginInline: { default: "calc(-1 * clamp(16px, 4vw, 32px))", [DESKTOP]: 0 },
    paddingInline: { default: "clamp(16px, 4vw, 32px)", [DESKTOP]: 0 },
    paddingTop: 12,
    paddingBottom: { default: "calc(12px + env(safe-area-inset-bottom))", [DESKTOP]: 0 },
  },
  navGrow: {
    flex: 1,
  },

  // ── Review ──────────────────────────────────────────────
  reviewHeader: { display: "flex", flexDirection: "column", gap: 8 },
  reviewTitle: {
    margin: 0,
    fontSize: "1.0625rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  reviewList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  reviewItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "12px 14px",
    borderRadius: "var(--hb-angel-radius-sm)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  reviewPrompt: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  reviewAnswer: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
});
