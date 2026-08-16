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
    flexWrap: "wrap",
    rowGap: 4,
    gap: 12,
    minHeight: 56,
    paddingBlock: 8,
    paddingInline: "clamp(16px, 4vw, 32px)",
    backgroundColor: "var(--hb-color-surface)",
    // Retire the hairline; a sticky toolbar gains soft elevation instead.
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  brand: { display: "flex", alignItems: "center", flexWrap: "wrap", rowGap: 4, gap: 10, minWidth: 0 },
  logo: {
    flexShrink: 0,
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundImage:
      "linear-gradient(135deg, var(--hb-color-accent) 0%, var(--hb-angel-green-deep) 100%)",
  },
  brandName: {
    fontSize: "1rem",
    fontWeight: 800,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  roleChip: {
    flexShrink: 0,
    paddingBlock: 3,
    paddingInline: 8,
    borderRadius: "var(--hb-angel-radius-pill)",
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.02em",
    color: "var(--hb-color-accent-dark)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  spacer: { flex: 1, minWidth: 0 },
  back: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    gap: 4,
    minHeight: 40,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "var(--hb-color-text-secondary)",
    paddingBlock: 6,
    paddingInline: 12,
    borderRadius: "var(--hb-angel-radius-control)",
    ":hover": { backgroundColor: "var(--hb-angel-surface-alt)" },
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
  },

  main: { flex: 1 },

  footer: {
    paddingBlock: 20,
    paddingInline: "clamp(16px, 4vw, 32px)",
    textAlign: "center",
  },
  footText: { fontSize: "0.75rem", color: "var(--hb-color-text-secondary)" },
});
