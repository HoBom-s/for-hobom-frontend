import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
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
    gap: 12,
  },
  header: { display: "flex", flexDirection: "column", gap: 6 },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  subtitle: { margin: 0, fontSize: "0.9375rem", color: "var(--hb-color-text-secondary)" },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [TABLET]: "repeat(3, 1fr)",
      [DESKTOP]: "repeat(4, 1fr)",
    },
    gap: { default: 12, [DESKTOP]: 16 },
    paddingTop: 8,
  },
  // Application kind · status, overlaid on the card photo (top-left).
  badge: {
    position: "absolute",
    insetBlockStart: 8,
    insetInlineStart: 8,
    zIndex: 1,
  },
  // A grid cell: the card plus an optional "후기 남기기" action beneath it.
  cell: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  reviewCta: {
    padding: "8px 12px",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "oklch(0.86 0.06 155)",
    fontFamily: "inherit",
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "var(--hb-color-accent-dark, oklch(0.46 0.08 155))",
    backgroundColor: { default: "oklch(0.97 0.02 155)", ":hover": "oklch(0.93 0.045 155)" },
    cursor: "pointer",
  },
  // Compose dialog.
  composeIntro: {
    margin: "0 0 12px",
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },
  stars: {
    display: "flex",
    gap: 4,
    marginBottom: 14,
  },
  star: {
    padding: 2,
    border: "none",
    background: "none",
    fontSize: "1.75rem",
    lineHeight: 1,
    color: "var(--hb-color-border)",
    cursor: "pointer",
  },
  starOn: {
    color: "var(--hb-color-accent)",
  },
});
