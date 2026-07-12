import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  photo: {
    position: "relative",
    aspectRatio: "4 / 3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--hb-angel-green-tint)",
    backgroundImage:
      "repeating-linear-gradient(45deg, var(--hb-angel-green-tint), var(--hb-angel-green-tint) 10px, var(--hb-angel-green-tint-strong) 10px, var(--hb-angel-green-tint-strong) 20px)",
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  paw: { fontSize: "2rem", opacity: 0.5 },
  body: { paddingInline: 14, paddingTop: 12, paddingBottom: 14 },
  nameRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 },
  name: { margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--hb-color-text-primary)" },
  meta: { margin: 0, marginTop: 6, fontSize: "0.8125rem", color: "var(--hb-color-text-secondary)" },
});
