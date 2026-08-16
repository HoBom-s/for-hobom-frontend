import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--hb-color-bg)",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    gap: 12,
    height: 56,
    paddingInline: "clamp(16px, 4vw, 32px)",
    backgroundColor: "var(--hb-color-surface)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-border)",
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  logo: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundImage:
      "linear-gradient(135deg, var(--hb-color-accent) 0%, var(--hb-angel-green-deep) 100%)",
  },
  brandName: {
    fontSize: "1rem",
    fontWeight: 800,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  roleChip: {
    paddingBlock: 3,
    paddingInline: 8,
    borderRadius: 999,
    fontSize: "0.6875rem",
    fontWeight: 700,
    color: "var(--hb-color-accent-dark)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  spacer: { flex: 1 },
  back: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "var(--hb-color-text-secondary)",
    paddingBlock: 6,
    paddingInline: 12,
    borderRadius: 8,
    ":hover": { backgroundColor: "var(--hb-angel-surface-alt)" },
  },

  main: { flex: 1 },

  footer: {
    paddingBlock: 20,
    paddingInline: "clamp(16px, 4vw, 32px)",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-color-border)",
    textAlign: "center",
  },
  footText: { fontSize: "0.75rem", color: "var(--hb-color-text-secondary)" },
});
