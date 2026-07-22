import * as stylex from "@stylexjs/stylex";

const WIDE = "@media (min-width: 1024px)";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: { [WIDE]: "100%" },
    minHeight: 0,
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: "4px 0 18px",
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
  count: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    margin: "0 0 12px",
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  countNum: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "var(--hb-color-text-secondary)",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  member: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
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
    color: "var(--hb-color-accent-contrast, #fff)",
    backgroundColor: "var(--hb-color-accent)",
  },
  memberMain: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
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
  // The role line under the name — "대표" / "스태프".
  role: {
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
  roleAdmin: {
    color: "var(--hb-color-accent-dark, oklch(0.46 0.08 155))",
    fontWeight: 600,
  },
  // Promotion request queue.
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
    gap: 6,
    flexShrink: 0,
  },
  empty: {
    padding: "28px 16px",
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.875rem",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "var(--hb-color-border)",
  },
  // Promotion request panel.
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  cardSubtitle: {
    margin: 0,
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  cardHint: {
    margin: 0,
    fontSize: "0.8125rem",
    lineHeight: 1.5,
    color: "var(--hb-color-text-secondary)",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 2,
  },
  // Trust-delegation footnote (§7.6): platform verifies the rep, the rep
  // approves staff.
  note: {
    margin: 0,
    padding: "10px 12px",
    borderRadius: 10,
    backgroundColor: "var(--hb-color-surface-subtle)",
    fontSize: "0.75rem",
    lineHeight: 1.5,
    color: "var(--hb-color-text-secondary)",
  },
});
