import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  section: {
    paddingBlock: "var(--hb-angel-space-section)",
    paddingInline: "clamp(16px, 4vw, 40px)",
  },
  inner: {
    maxWidth: 1120,
    marginInline: "auto",
    padding: { default: "44px 24px", [DESKTOP]: "64px 40px" },
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundImage: "var(--hb-angel-cta-gradient)",
    boxShadow: "var(--hb-angel-glow-accent)",
    textAlign: "center",
    color: "#ffffff",
  },
  title: {
    margin: 0,
    fontSize: { default: "1.625rem", [DESKTOP]: "2rem" },
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  lead: {
    margin: 0,
    marginTop: 12,
    marginBottom: 28,
    fontSize: "1.0625rem",
    color: "rgba(255,255,255,0.9)",
  },
});
