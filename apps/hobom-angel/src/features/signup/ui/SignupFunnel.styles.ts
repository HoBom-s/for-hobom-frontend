import * as stylex from "@stylexjs/stylex";

const REDUCED = "@media (prefers-reduced-motion: reduce)";

// Step transition: incoming step fades and lifts in; stilled under reduced-motion.
const stepEnter = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(8px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(16px, 4vw, 40px)",
    backgroundImage: "var(--hb-angel-hero-wash)",
  },
  card: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: "var(--hb-color-surface)",
    borderRadius: "var(--hb-angel-radius-card)",
    boxShadow: "var(--hb-angel-shadow-lg)",
    overflow: "hidden",
  },
  body: { paddingBlock: "clamp(32px, 6vw, 40px)", paddingInline: "clamp(24px, 5vw, 36px)" },
  step: {
    animationName: stepEnter,
    animationDuration: { default: "var(--hb-angel-dur-slow)", [REDUCED]: "0.01s" },
    animationTimingFunction: "var(--hb-angel-ease)",
  },

  // ── Headings ────────────────────────────────────────────
  overline: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
    marginBottom: 10,
  },
  title: {
    position: "relative",
    margin: 0,
    paddingLeft: 16,
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
    "::before": {
      content: "''",
      position: "absolute",
      left: 0,
      top: "0.15em",
      width: 3,
      height: "1.1em",
      borderRadius: 999,
      backgroundColor: "var(--hb-color-accent)",
    },
  },
  subtitle: {
    margin: 0,
    marginTop: 8,
    marginBottom: 28,
    paddingLeft: 16,
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },

  // ── Fields ──────────────────────────────────────────────
  fields: { display: "flex", flexDirection: "column", gap: 16 },
  submit: { marginTop: 28 },
  toggle: {
    minHeight: 40,
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
    paddingInline: 8,
  },
  footer: {
    margin: 0,
    marginTop: 20,
    textAlign: "center",
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
  },
  footerLink: { fontWeight: 700, color: "var(--hb-color-accent-dark)" },

  // ── Agreement ───────────────────────────────────────────
  // The one warm/emotional moment on this surface: "전체 동의" welcome tile.
  agreeAll: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    minHeight: 40,
    padding: 16,
    borderRadius: "var(--hb-angel-radius-sm)",
    backgroundColor: "var(--hb-angel-warm-tint)",
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
    cursor: "pointer",
    marginBottom: 8,
  },
  agreeRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    minHeight: 40,
    paddingBlock: 8,
    paddingInline: 4,
    fontSize: "0.875rem",
    color: "var(--hb-color-text-primary)",
    cursor: "pointer",
  },
  agreeLabel: { flex: 1 },
  agreeView: { fontSize: "0.8125rem", color: "var(--hb-color-text-secondary)" },
  optionalTag: { color: "var(--hb-color-text-secondary)", fontWeight: 500 },
});
