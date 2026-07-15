import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  // Desktop only — the mobile bottom tab carries navigation.
  root: {
    display: { default: "none", [DESKTOP]: "block" },
    marginTop: 40,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
  },
  // Single compact row: identity on the left, links on the right.
  inner: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingBlock: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
  },
  identity: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brand: {
    fontSize: "0.9375rem",
    fontWeight: 800,
    color: "var(--hb-color-text-primary)",
  },
  copyright: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
  },
  link: {
    fontSize: "0.8125rem",
    fontWeight: 500,
    textDecoration: "none",
    color: {
      default: "var(--hb-color-text-secondary)",
      ":hover": "var(--hb-color-accent-dark)",
    },
  },
});
