import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 768px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 720,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 16,
    paddingBottom: 48,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  // Editorial header: overline kicker + accent left-rule title + warm lead,
  // with the 확인서 발급 primary pinned right (wraps below on mobile).
  header: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: 12,
  },
  headings: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
    minWidth: "min(100%, 15rem)",
  },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  kickerDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "var(--hb-angel-accent-warm)",
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: 0,
    fontSize: "26px",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  // 3px × 24px accent left-rule.
  rule: {
    display: "inline-block",
    flexShrink: 0,
    width: 3,
    height: 24,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },
  subtitle: {
    margin: 0,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  // Full-tap issue button on mobile (wraps below headings); auto on tablet+.
  issue: {
    width: { default: "100%", [TABLET]: "auto" },
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },

  // Certificate card — a document artifact, not interactive. Floated on the
  // resting shadow (no hover lift), grounded and formal.
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    padding: 20,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    overflow: "hidden",
  },
  // Hairline accent bar reading as an official certificate header.
  accentBar: {
    position: "absolute",
    insetBlockStart: 0,
    insetInlineStart: 0,
    insetInlineEnd: 0,
    height: 3,
    backgroundColor: "var(--hb-color-accent)",
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  // Cert number — the trust/verification token, kept meadow green.
  certNo: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "var(--hb-color-accent-dark)",
    backgroundColor: "var(--hb-angel-green-tint)",
    paddingBlock: 4,
    paddingInline: 10,
    borderRadius: "var(--hb-angel-radius-sm)",
  },
  issuedAt: { fontSize: "0.8125rem", color: "var(--hb-color-text-secondary)" },
  spacer: { flex: 1 },

  // Totals strip — the credible 'proof' stat block; kept green (trust).
  totals: {
    display: "flex",
    gap: 20,
    padding: 14,
    borderRadius: "var(--hb-angel-radius-sm)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  total: { display: "flex", flexDirection: "column", gap: 2 },
  totalValue: {
    fontSize: "1.25rem",
    fontWeight: 800,
    fontVariantNumeric: "tabular-nums",
    color: "var(--hb-color-accent-dark)",
  },
  totalLabel: { fontSize: "0.75rem", color: "var(--hb-color-text-secondary)" },

  items: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  item: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 8,
    fontSize: "0.875rem",
  },
  itemTitle: {
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  itemMeta: { color: "var(--hb-color-text-secondary)" },
  itemSpacer: { flex: 1, minWidth: 8 },
});
