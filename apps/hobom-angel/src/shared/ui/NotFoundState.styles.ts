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
  code: {
    fontSize: "clamp(56px, 12vw, 88px)",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    color: "var(--hb-color-accent)",
  },
  title: {
    margin: 0,
    marginTop: 12,
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  desc: {
    margin: 0,
    marginTop: 6,
    marginBottom: 24,
    fontSize: "0.9375rem",
    color: "var(--hb-color-text-secondary)",
  },
  actions: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" },
});
