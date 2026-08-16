import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const floatUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(16px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  // Hero — marigold->neutral radial wash, matching the landing hero.
  hero: {
    paddingBlock: { default: "48px 40px", [DESKTOP]: "72px 56px" },
    paddingInline: "clamp(16px, 4vw, 40px)",
    backgroundImage: "var(--hb-angel-hero-wash)",
    textAlign: "center",
  },
  heroInner: {
    maxWidth: 720,
    marginInline: "auto",
    animationName: floatUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  // The surface's one HOPE cue: overline kicker + marigold dot.
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "var(--hb-angel-accent-warm)",
  },
  title: {
    margin: 0,
    marginTop: 18,
    fontSize: { default: "30px", [TABLET]: "40px", [DESKTOP]: "48px" },
    lineHeight: 1.15,
    fontWeight: 700,
    letterSpacing: "-0.025em",
    color: "var(--hb-color-text-primary)",
  },
  lead: {
    margin: 0,
    marginTop: 18,
    marginInline: "auto",
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },

  // Generic section
  section: {
    paddingBlock: { default: 48, [DESKTOP]: 64 },
    paddingInline: "clamp(16px, 4vw, 40px)",
  },
  altSection: { backgroundColor: "var(--hb-angel-surface-alt)" },
  inner: { maxWidth: 1120, marginInline: "auto" },
  head: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 40,
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
    marginBottom: 12,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: "1.375rem", [DESKTOP]: "1.625rem" },
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  sectionSub: {
    margin: 0,
    marginTop: 10,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "1.0625rem",
    lineHeight: 1.6,
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
  // Floating card — flat border retired for elevation.
  card: {
    position: "relative",
    backgroundColor: "var(--hb-color-surface)",
    borderRadius: "var(--hb-angel-radius-card)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    padding: "28px 24px",
    textAlign: "center",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":hover": { transform: "translateY(-3px)", boxShadow: "var(--hb-angel-shadow-md)" },
    [REDUCE]: { transitionProperty: "none", ":hover": { transform: "none" } },
  },
  tag: {
    display: "inline-block",
    paddingBlock: 4,
    paddingInline: 12,
    borderRadius: "var(--hb-angel-radius-pill)",
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
    fontVariantNumeric: "tabular-nums",
    boxShadow: "0 0 0 6px var(--hb-color-surface), 0 0 0 8px var(--hb-angel-warm-tint)",
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

  // CTA band — the one emotional gradient, floated off the warm canvas.
  ctaInner: {
    maxWidth: 1120,
    marginInline: "auto",
    padding: { default: "40px 24px", [DESKTOP]: "56px 40px" },
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundImage: "var(--hb-angel-cta-gradient)",
    boxShadow: "var(--hb-angel-shadow-md)",
    textAlign: "center",
    color: "var(--hb-angel-on-photo)",
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
    color: "var(--hb-angel-on-photo-muted)",
  },
  // The one emotional CTA on the dark gradient: on-photo (white) fill reading as
  // accent-dark ink. A subtle warm shift on hover keeps a visible press/hover
  // affordance, mirroring the card hover-lift elsewhere on the page.
  ctaButton: {
    backgroundColor: {
      default: "var(--hb-angel-on-photo)",
      ":hover": "color-mix(in srgb, var(--hb-angel-on-photo) 92%, var(--hb-color-accent))",
    },
    color: "var(--hb-color-accent-dark)",
  },
});
