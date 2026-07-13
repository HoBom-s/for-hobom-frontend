import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  root: {
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 40,
    textAlign: "center",
  },
  emoji: { fontSize: "2.5rem" },
  title: { margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "var(--hb-color-text-primary)" },
  desc: { margin: 0, fontSize: "0.9375rem", color: "var(--hb-color-text-secondary)" },
});
