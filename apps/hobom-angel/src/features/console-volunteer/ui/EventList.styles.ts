import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  empty: {
    padding: "40px 16px",
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.9375rem",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "var(--hb-color-border)",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
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
    color: "var(--hb-color-text-primary)",
  },
  when: {
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
  },
  gauge: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "var(--hb-color-surface-subtle)",
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
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-color-border)",
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
