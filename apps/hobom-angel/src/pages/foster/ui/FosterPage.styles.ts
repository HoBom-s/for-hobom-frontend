import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  // Hero
  hero: {
    paddingBlock: { default: "48px 40px", [DESKTOP]: "72px 56px" },
    paddingInline: "clamp(16px, 4vw, 40px)",
    backgroundColor: "var(--hb-color-surface)",
    textAlign: "center",
  },
  heroInner: { maxWidth: 720, marginInline: "auto" },
  badge: {
    display: "inline-block",
    paddingBlock: 8,
    paddingInline: 16,
    borderRadius: 999,
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent-dark)",
    fontSize: "0.8125rem",
    fontWeight: 600,
  },
  title: {
    margin: 0,
    marginTop: 24,
    fontSize: { default: "30px", [TABLET]: "40px", [DESKTOP]: "48px" },
    lineHeight: 1.25,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  lead: {
    margin: 0,
    marginTop: 20,
    marginInline: "auto",
    maxWidth: 560,
    fontSize: "1rem",
    lineHeight: 1.7,
    color: "var(--hb-color-text-secondary)",
  },

  // Generic section
  section: {
    paddingBlock: { default: 48, [DESKTOP]: 64 },
    paddingInline: "clamp(16px, 4vw, 40px)",
  },
  altSection: { backgroundColor: "var(--hb-angel-surface-alt)" },
  inner: { maxWidth: 1120, marginInline: "auto" },
  head: { textAlign: "center", marginBottom: 36 },
  sectionTitle: {
    margin: 0,
    fontSize: { default: "1.375rem", [DESKTOP]: "1.625rem" },
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  sectionSub: {
    margin: 0,
    marginTop: 10,
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },

  // Card grids (compare 2-up, steps/terms responsive)
  compareGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "repeat(2, 1fr)" },
    gap: 16,
  },
  grid: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "repeat(2, 1fr)", [DESKTOP]: "repeat(4, 1fr)" },
    gap: 16,
  },
  card: {
    backgroundColor: "var(--hb-color-surface)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: "var(--hb-angel-radius-card)",
    padding: "28px 24px",
    textAlign: "center",
  },
  tag: {
    display: "inline-block",
    paddingBlock: 4,
    paddingInline: 12,
    borderRadius: 999,
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent-dark)",
    fontSize: "0.75rem",
    fontWeight: 700,
  },
  num: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: "50%",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent-dark)",
    fontSize: "1.125rem",
    fontWeight: 800,
  },
  cardTitle: {
    margin: 0,
    marginTop: 16,
    fontSize: "1.0625rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  cardDesc: {
    margin: 0,
    marginTop: 8,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },

  // CTA band
  ctaInner: {
    maxWidth: 1120,
    marginInline: "auto",
    padding: { default: "40px 24px", [DESKTOP]: "56px 40px" },
    borderRadius: 24,
    backgroundImage:
      "linear-gradient(135deg, var(--hb-color-accent) 0%, var(--hb-angel-green-deep) 100%)",
    textAlign: "center",
    color: "#ffffff",
  },
  ctaTitle: {
    margin: 0,
    fontSize: { default: "1.375rem", [DESKTOP]: "1.75rem" },
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  ctaLead: {
    margin: 0,
    marginTop: 10,
    marginBottom: 24,
    fontSize: "0.9375rem",
    color: "rgba(255,255,255,0.85)",
  },
});
