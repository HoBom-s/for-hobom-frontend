import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  section: { paddingBlock: { default: 48, [DESKTOP]: 64 }, paddingInline: "clamp(16px, 4vw, 40px)" },
  inner: {
    maxWidth: 1120,
    marginInline: "auto",
    padding: { default: "40px 24px", [DESKTOP]: "56px 40px" },
    borderRadius: 24,
    backgroundImage:
      "linear-gradient(135deg, var(--hb-color-accent) 0%, var(--hb-angel-green-deep) 100%)",
    textAlign: "center",
    color: "#ffffff",
  },
  title: {
    margin: 0,
    fontSize: { default: "1.375rem", [DESKTOP]: "1.75rem" },
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  lead: { margin: 0, marginTop: 10, marginBottom: 24, fontSize: "0.9375rem", color: "rgba(255,255,255,0.85)" },
});
