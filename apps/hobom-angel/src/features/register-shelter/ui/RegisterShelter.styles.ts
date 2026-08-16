import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  // Page canvas: warm-neutral, with the header/timeline on bare canvas and the
  // form body floating in a single card below.
  root: {
    maxWidth: 560,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 24,
    paddingBottom: 64,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    backgroundColor: "var(--hb-color-bg)",
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },

  // ── Header (on canvas, above the card) ──────────────────
  header: { display: "flex", flexDirection: "column", gap: 12 },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  // Marigold dot — the single HOPE cue on this surface.
  kickerDot: {
    width: 6,
    height: 6,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-accent-warm)",
  },
  titleRow: { display: "flex", alignItems: "center", gap: 12 },
  rule: {
    flexShrink: 0,
    width: 3,
    height: 24,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },
  title: {
    margin: 0,
    fontSize: "1.625rem",
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

  // ── Flow timeline: connected 3-step ribbon on surface-alt ─
  steps: {
    display: "flex",
    gap: 8,
    padding: 14,
    borderRadius: "var(--hb-angel-radius-md)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  step: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    textAlign: "center",
  },
  stepNum: {
    alignSelf: "center",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent-dark)",
    fontSize: "0.75rem",
    fontWeight: 800,
    fontVariantNumeric: "tabular-nums",
  },
  // Step 1 gets the stronger tint disc: where the applicant is right now.
  stepNumActive: {
    backgroundColor: "var(--hb-angel-green-tint-strong)",
  },
  stepLabel: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
  stepDesc: {
    fontSize: { default: "0.6875rem", [TABLET]: "0.75rem" },
    lineHeight: 1.35,
    color: "var(--hb-color-text-secondary)",
  },

  // ── Floating form card (holds all sections) ─────────────
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 28,
    padding: "clamp(20px, 4vw, 28px)",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },

  // Sections separated by rhythm (gap 28) — no hr dividers.
  section: { display: "flex", flexDirection: "column", gap: 16 },
  sectionHead: { display: "flex", flexDirection: "column", gap: 4 },
  sectionKicker: {
    fontSize: "0.625rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.0625rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  sectionNote: { margin: 0, fontSize: "0.8125rem", color: "var(--hb-color-text-secondary)" },
  row: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "1fr 1fr" },
    gap: 14,
  },

  // Slug field with a URL prefix + live preview, wrapped in a branded chip.
  slugPreview: {
    display: "inline-flex",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
    marginTop: 8,
    paddingBlock: 6,
    paddingInline: 10,
    borderRadius: "var(--hb-angel-radius-sm)",
    backgroundColor: "var(--hb-angel-green-tint)",
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
    wordBreak: "break-all",
  },
  slugValue: { color: "var(--hb-color-accent-dark)", fontWeight: 600 },

  // Address visibility segmented choice
  fieldLabel: {
    display: "block",
    marginBottom: 8,
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "var(--hb-color-text-secondary)",
  },
  hint: {
    margin: "8px 0 0",
    fontSize: "0.8125rem",
    lineHeight: 1.5,
    color: "var(--hb-color-text-secondary)",
  },
});
