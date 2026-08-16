import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";

export const styles = stylex.create({
  root: {
    maxWidth: 560,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 24,
    paddingBottom: 64,
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },

  // Header + "이렇게 진행돼요" timeline
  header: { display: "flex", flexDirection: "column", gap: 10 },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: 0,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  steps: {
    display: "flex",
    gap: 8,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  step: {
    flex: 1,
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
    borderRadius: "50%",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent-dark)",
    fontSize: "0.75rem",
    fontWeight: 800,
  },
  stepLabel: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
  stepDesc: { fontSize: "0.6875rem", color: "var(--hb-color-text-secondary)" },

  // Light sections — no heavy card, just a heading and breathing room
  section: { display: "flex", flexDirection: "column", gap: 16 },
  sectionHead: { display: "flex", flexDirection: "column", gap: 2 },
  sectionTitle: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  sectionNote: { margin: 0, fontSize: "0.8125rem", color: "var(--hb-color-text-secondary)" },
  divider: {
    height: 1,
    border: "none",
    margin: 0,
    backgroundColor: "var(--hb-color-border)",
  },
  row: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "1fr 1fr" },
    gap: 14,
  },

  // Slug field with a URL prefix + live preview
  slugPreview: {
    marginTop: 8,
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
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
