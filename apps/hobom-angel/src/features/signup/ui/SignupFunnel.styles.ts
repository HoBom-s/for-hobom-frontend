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
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  card: {
    width: "100%",
    maxWidth: 440,
    backgroundColor: "var(--hb-color-surface)",
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    boxShadow: "var(--hb-angel-shadow)",
    overflow: "hidden",
  },
  body: { padding: "32px 28px" },
  step: {
    animationName: stepEnter,
    animationDuration: { default: "0.28s", [REDUCED]: "0.01s" },
    animationTimingFunction: "ease-out",
  },

  // ── Headings ────────────────────────────────────────────
  title: { margin: 0, fontSize: "1.375rem", fontWeight: 800, color: "var(--hb-color-text-primary)" },
  subtitle: {
    margin: 0,
    marginTop: 8,
    marginBottom: 24,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },

  // ── Fields ──────────────────────────────────────────────
  fields: { display: "flex", flexDirection: "column", gap: 16 },
  fieldLabel: {
    display: "block",
    marginBottom: 6,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
  nickRow: { display: "flex", gap: 8, alignItems: "flex-start" },
  submit: { marginTop: 24 },
  hint: {
    margin: 0,
    marginTop: 12,
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
    textAlign: "center",
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
  agreeAll: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "var(--hb-angel-surface-alt)",
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
    paddingBlock: 8,
    paddingInline: 4,
    fontSize: "0.875rem",
    color: "var(--hb-color-text-primary)",
    cursor: "pointer",
  },
  agreeLabel: { flex: 1 },
  agreeView: { fontSize: "0.8125rem", color: "var(--hb-color-text-secondary)" },
  optionalTag: { color: "var(--hb-color-text-secondary)", fontWeight: 500 },

  // ── Code boxes ──────────────────────────────────────────
  codeWrap: { position: "relative", display: "flex", justifyContent: "center", gap: 8 },
  codeInput: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
    borderWidth: 0,
  },
  codeBox: {
    width: 44,
    height: 54,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    fontSize: "1.375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  codeBoxActive: { borderColor: "var(--hb-color-accent)" },
  codeMeta: {
    marginTop: 16,
    textAlign: "center",
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  resend: {
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: "transparent",
    color: "var(--hb-color-accent-dark)",
    fontWeight: 600,
    cursor: "pointer",
  },

  // ── Done ────────────────────────────────────────────────
  done: { textAlign: "center", paddingBlock: 12 },
  doneCheck: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: "50%",
    marginBottom: 20,
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent)",
    fontSize: "2rem",
  },
});
