import * as stylex from "@stylexjs/stylex";

const WIDE = "@media (min-width: 1024px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: { [WIDE]: "100%" },
    minHeight: 0,
  },
  // ── Header ──
  header: {
    marginBottom: 20,
  },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    margin: "0 0 8px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  kickerRule: {
    width: 3,
    height: 24,
    flexShrink: 0,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: "6px 0 0",
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [WIDE]: "1fr 1fr" },
    alignItems: "start",
    gap: 20,
    flex: { [WIDE]: 1 },
    minHeight: 0,
  },
  col: {
    minHeight: 0,
    height: { [WIDE]: "100%" },
    overflowY: { [WIDE]: "auto" },
  },
  // ── Column header (overline kicker + count) ──
  colHeader: {
    margin: "0 0 12px",
  },
  overline: {
    margin: "0 0 4px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  count: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  countNum: {
    fontSize: "0.875rem",
    fontWeight: 700,
    color: "var(--hb-color-accent-dark)",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  // ── Member / request rows — soft float, no border, no lift (non-interactive) ──
  member: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    transition: { default: "background-color var(--hb-angel-dur) var(--hb-angel-ease)", [REDUCE]: "none" },
    ":hover": {
      backgroundColor: "var(--hb-angel-surface-alt)",
    },
  },
  avatar: {
    width: 36,
    height: 36,
    flexShrink: 0,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-accent-contrast)",
    backgroundColor: "var(--hb-color-accent)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  memberMain: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
    flex: 1,
  },
  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    minWidth: 0,
  },
  nickname: {
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  // The role line under the name — plain "스태프" text.
  role: {
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
  // "대표" rendered as a green trust/status chip.
  roleChip: {
    display: "inline-flex",
    alignItems: "center",
    alignSelf: "flex-start",
    padding: "2px 10px",
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent-dark)",
    fontSize: "0.75rem",
    fontWeight: 700,
  },
  // ── Promotion request queue ──
  panelSubtitle: {
    margin: "0 0 12px",
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  requestMeta: {
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
  requestActions: {
    display: "flex",
    gap: 8,
    flexShrink: 0,
    flexWrap: "wrap",
  },
  // ≥40px tap targets on the approve/reject buttons.
  requestButton: {
    minHeight: 40,
  },
  // ── Branded empty state — calm green tint tile, not bare dashed grey ──
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: { default: "28px 20px", "@media (max-width: 420px)": "22px 16px" },
    textAlign: "center",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  emptyKicker: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  emptyText: {
    margin: 0,
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
  },
  // ── Trust-delegation footnote (§7.6): branded green tint w/ accent left-rule ──
  note: {
    margin: "16px 0 0",
    padding: { default: "12px 14px", "@media (max-width: 420px)": "10px 12px" },
    borderRadius: "var(--hb-angel-radius-sm)",
    borderLeftWidth: 3,
    borderLeftStyle: "solid",
    borderLeftColor: "var(--hb-color-accent)",
    backgroundColor: "var(--hb-angel-green-tint)",
    fontSize: "0.75rem",
    lineHeight: 1.5,
    color: "var(--hb-color-text-secondary)",
  },
  // ── Reject dialog paper — modal elevation + card radius ──
  dialogPaper: {
    borderRadius: "var(--hb-angel-radius-card)",
    boxShadow: "var(--hb-angel-shadow-lg)",
  },
});
