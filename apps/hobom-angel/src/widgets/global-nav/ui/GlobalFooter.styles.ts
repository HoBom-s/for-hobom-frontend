import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";
const WIDE = "@media (min-width: 1200px)";

export const styles = stylex.create({
  // Desktop only — the mobile bottom tab carries navigation. Dark surface.
  root: {
    display: { default: "none", [DESKTOP]: "block" },
    marginTop: 40,
    backgroundColor: "oklch(0.235 0.012 240)",
    color: "oklch(0.82 0.01 240)",
  },
  // Brand column (wider) + three link columns.
  top: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingInline: "clamp(24px, 4vw, 44px)",
    paddingBlock: 40,
    display: "grid",
    gridTemplateColumns: { default: "1.4fr 1fr 1fr", [WIDE]: "1.6fr 1fr 1fr 1fr" },
    gap: 32,
  },
  brand: {
    gridColumn: { default: "1 / -1", [WIDE]: "auto" },
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "oklch(0.56 0.078 155)",
    flexShrink: 0,
  },
  brandName: {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: "oklch(0.96 0.01 240)",
  },
  brandDesc: {
    margin: 0,
    fontSize: "0.84375rem",
    lineHeight: 1.7,
    color: "oklch(0.72 0.01 240)",
    maxWidth: 300,
  },
  socials: {
    display: "flex",
    gap: 10,
    marginTop: 18,
  },
  social: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "oklch(0.28 0.015 240)",
  },
  colHeading: {
    margin: 0,
    marginBottom: 14,
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "oklch(0.62 0.01 240)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  colLinks: {
    display: "flex",
    flexDirection: "column",
    gap: 11,
  },
  link: {
    width: "fit-content",
    fontSize: "0.84375rem",
    textDecoration: "none",
    cursor: "pointer",
    color: { default: "oklch(0.82 0.01 240)", ":hover": "oklch(0.96 0.01 240)" },
  },
  // Darker legal bar.
  bottom: {
    backgroundColor: "oklch(0.18 0.012 240)",
    color: "oklch(0.62 0.01 240)",
    fontSize: "0.78125rem",
  },
  bottomInner: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingInline: "clamp(24px, 4vw, 44px)",
    paddingBlock: 18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  legal: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
  },
  copyright: {
    color: "oklch(0.62 0.01 240)",
  },
});
