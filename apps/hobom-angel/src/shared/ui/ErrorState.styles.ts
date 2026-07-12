import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "100vh",
    paddingBlock: 64,
    paddingInline: 20,
  },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: "50%",
    marginBottom: 16,
    backgroundColor: "var(--hb-color-warning-subtle)",
    color: "var(--hb-color-warning)",
    fontSize: "1.75rem",
    fontWeight: 800,
  },
  title: { margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "var(--hb-color-text-primary)" },
  desc: {
    margin: 0,
    marginTop: 6,
    marginBottom: 20,
    maxWidth: 360,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
});
