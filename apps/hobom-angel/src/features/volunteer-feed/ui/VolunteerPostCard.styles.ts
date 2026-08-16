import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

export const styles = stylex.create({
  // Shared by PostAuthor (modal header + comments).
  authorRow: { display: "flex", alignItems: "center", gap: 10 },
  authorMeta: { display: "flex", flexDirection: "column", gap: 1, minWidth: 0 },
  nickname: { fontSize: "0.9375rem", fontWeight: 700, color: "var(--hb-color-text-primary)" },
  time: { fontSize: "0.75rem", color: "var(--hb-color-text-secondary)" },

  // Feed grid tile — a borderless floating square that lifts on hover.
  tile: {
    position: "relative",
    aspectRatio: "1 / 1",
    overflow: "hidden",
    borderRadius: "var(--hb-angel-radius-md)",
    borderWidth: 0,
    borderStyle: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    backgroundColor: "var(--hb-angel-surface-alt)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":hover": { transform: "translateY(-3px)", boxShadow: "var(--hb-angel-shadow-md)" },
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
    [REDUCE]: { transitionProperty: "none", ":hover": { transform: "none" } },
  },
  tileImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  // Text-only review sits on a branded green→warm tint tile, never bare grey.
  textTile: {
    width: "100%",
    height: "100%",
    display: "-webkit-box",
    WebkitLineClamp: 6,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    padding: 16,
    boxSizing: "border-box",
    textAlign: "start",
    fontSize: "0.9375rem",
    lineHeight: 1.55,
    color: "var(--hb-color-text-primary)",
    whiteSpace: "pre-line",
    backgroundImage:
      "linear-gradient(135deg, var(--hb-angel-green-tint) 0%, var(--hb-angel-warm-tint) 100%)",
  },
  // Scrim-based hover overlay carrying WHITE like / comment counts.
  overlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "0.9375rem",
    backgroundImage:
      "linear-gradient(to top, oklch(0.20 0.04 152 / 0.62) 0%, oklch(0.20 0.04 152 / 0.30) 100%)",
    opacity: { default: 0, ":hover": 1 },
    transitionProperty: "opacity",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    [REDUCE]: { transitionProperty: "none" },
  },
  overlayItem: { display: "inline-flex", alignItems: "center", gap: 5 },

  // Shared by PostActions (modal).
  actions: { display: "flex", alignItems: "center", gap: 18, paddingTop: 4 },
  action: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: 0,
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
    transitionProperty: "transform, color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease-spring)",
    ":active": { transform: "scale(0.92)" },
    [REDUCE]: { transitionProperty: "none", ":active": { transform: "none" } },
  },
  liked: { color: "var(--hb-angel-urgent)" },
  pushRight: { marginInlineStart: "auto" },
  bookmarked: { color: "var(--hb-color-accent-dark)" },
});
