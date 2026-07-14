import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 16,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  crumbLink: {
    color: "var(--hb-color-text-secondary)",
    textDecoration: "none",
  },
  crumbCurrent: {
    color: "var(--hb-color-text-primary)",
    fontWeight: 600,
  },
  topGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1.2fr 1fr" },
    gap: 28,
    alignItems: "start",
  },
  intro: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: "var(--hb-angel-radius-card)",
    padding: 20,
  },
  introTitle: {
    margin: 0,
    marginBottom: 10,
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  introBody: {
    margin: 0,
    fontSize: "0.9375rem",
    lineHeight: 1.7,
    color: "var(--hb-color-text-secondary)",
    whiteSpace: "pre-line",
  },
});
