import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  chips: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  shelterLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    textDecoration: "none",
    color: "var(--hb-color-text-secondary)",
    ":hover": { color: "var(--hb-color-accent-dark)" },
  },
  // Warm-tinted panel for the OVERSEAS 이동봉사 detail — the one hopeful moment.
  transport: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    padding: 16,
    borderRadius: "var(--hb-angel-radius-md)",
    backgroundColor: "var(--hb-angel-warm-tint)",
  },
  transportTitle: {
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--hb-angel-accent-warm-dark)",
  },
});
