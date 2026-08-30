import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

export const styles = stylex.create({
  root: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 34,
    paddingBottom: 60,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    backgroundColor: "#F7F2E9",
  },

  // Page header: overline kicker + 3px×24px accent left-rule above the title.
  header: { display: "flex", flexDirection: "column", gap: 6 },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  titleRow: { display: "flex", alignItems: "center", gap: 10 },
  rule: {
    display: "inline-block",
    flexShrink: 0,
    width: 3,
    height: 24,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },
  title: {
    margin: 0,
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.75rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: { margin: 0, fontSize: "0.9375rem", color: "var(--hb-color-text-secondary)" },
  panel: { paddingTop: 20 },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  // Verification card — soft float, no flat hairline. Subtle tint on hover
  // (a calm queue row, not a lifting hero card).
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 16,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    transitionProperty: "background-color",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":hover": { backgroundColor: "var(--hb-angel-surface-alt)" },
    [REDUCE]: { transitionProperty: "none" },
  },
  // Report card — reports are attention/moderation items: an urgent left rule
  // distinguishes them from the green verification queue.
  reportCard: {
    borderLeftWidth: 3,
    borderLeftStyle: "solid",
    borderLeftColor: "var(--hb-angel-urgent)",
  },
  cardSkeleton: {
    height: 74,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  headline: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  spacer: { flex: 1 },
  actions: { display: "flex", gap: 6, flexShrink: 0 },
  detail: {
    margin: 0,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-primary)",
    whiteSpace: "pre-line",
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2px 12px",
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },

  // Empty verification queue is a good/trust state → calm branded green tile.
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    paddingBlock: "clamp(28px, 6vw, 40px)",
    paddingInline: 16,
    textAlign: "center",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  emptyKicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  emptyText: {
    margin: 0,
    fontSize: "0.9375rem",
    color: "var(--hb-color-accent-dark)",
  },
});
