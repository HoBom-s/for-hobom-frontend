import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";
const NARROW = "@media (max-width: 480px)";

export const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: { default: "40px 24px", [NARROW]: "28px 16px" },
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.9375rem",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  emptyKicker: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: { default: 18, [NARROW]: 14 },
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    transform: { [REDUCE]: "none" },
    ":hover": {
      transform: { default: "translateY(-2px)", [REDUCE]: "none" },
      boxShadow: "var(--hb-angel-shadow-md)",
    },
  },
  head: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  title: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  when: {
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
  },
  gauge: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "var(--hb-angel-surface-alt)",
    overflow: "hidden",
  },
  gaugeFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "var(--hb-color-accent)",
  },
  recruit: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  spacer: {
    flex: 1,
  },
  applicants: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 4,
    padding: 12,
    borderRadius: "var(--hb-angel-radius-sm)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  applicantRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  applicantName: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
  applicantStatus: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  muted: {
    padding: "8px 0",
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
});
