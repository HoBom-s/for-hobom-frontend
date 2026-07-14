import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  link: {
    display: "block",
    color: "inherit",
    textDecoration: "none",
    borderRadius: "var(--hb-angel-radius-card)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "0.15s",
    transform: { default: "none", ":hover": "translateY(-2px)" },
    boxShadow: { default: "none", ":hover": "var(--hb-angel-shadow)" },
  },
  body: { paddingInline: 14, paddingTop: 12, paddingBottom: 14 },
  nameRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 },
  name: { margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--hb-color-text-primary)" },
  meta: { margin: 0, marginTop: 6, fontSize: "0.8125rem", color: "var(--hb-color-text-secondary)" },
});
