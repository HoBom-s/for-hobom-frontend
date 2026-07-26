import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  root: {
    minHeight: "100%",
    maxWidth: 640,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 16,
    paddingBottom: { default: 16, [DESKTOP]: 40 },
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  // Grows on mobile so the nav sits at the screen bottom; natural height on
  // desktop so the nav sits just below the question.
  funnelArea: {
    flex: { default: 1, [DESKTOP]: "0 1 auto" },
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  back: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 8,
    fontSize: "1.1rem",
    color: "var(--hb-color-text-primary)",
    textDecoration: "none",
  },
  title: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: 800,
    color: "var(--hb-color-text-primary)",
  },

  // ── Progress ────────────────────────────────────────────
  progressRow: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  stepLabel: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "var(--hb-color-text-secondary)",
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "var(--hb-color-canvas)",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "var(--hb-color-accent)",
    transitionProperty: "width",
    transitionDuration: "0.25s",
    transitionTimingFunction: "ease",
  },

  // ── Step / fields ───────────────────────────────────────
  step: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  emptyNote: {
    margin: 0,
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },

  // ── Nav (bottom action bar on mobile, inline on desktop) ─
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingTop: 12,
    borderTopWidth: { default: 1, [DESKTOP]: 0 },
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-color-border)",
  },
  navGrow: {
    flex: 1,
  },

  // ── Review ──────────────────────────────────────────────
  reviewTitle: {
    margin: 0,
    fontSize: "1.0625rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  reviewItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBlock: 12,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-border)",
  },
  reviewPrompt: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  reviewAnswer: {
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
});
