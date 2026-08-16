import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

export const styles = stylex.create({
  // Borderless floating card: shadow-sm at rest, hover-lifts to shadow-md.
  link: {
    display: "block",
    height: "100%",
    color: "inherit",
    textDecoration: "none",
    borderRadius: "var(--hb-angel-radius-card)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    transform: { default: "none", ":hover": "translateY(-3px)" },
    boxShadow: {
      default: "var(--hb-angel-shadow-sm)",
      ":hover": "var(--hb-angel-shadow-md)",
      ":focus-visible": "var(--hb-angel-focus-ring), var(--hb-angel-shadow-md)",
    },
    outline: { ":focus-visible": "none" },
    [REDUCE]: { transform: "none", transitionProperty: "box-shadow" },
  },

  // Full-bleed media with a scrim carrying the white name + status overlay.
  media: { position: "relative" },
  scrim: {
    position: "absolute",
    inset: 0,
    backgroundImage: "var(--hb-angel-photo-scrim)",
    pointerEvents: "none",
  },
  overlay: {
    position: "absolute",
    insetInline: 16,
    bottom: 14,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
    pointerEvents: "none",
  },
  overlayName: {
    margin: 0,
    fontSize: "1.0625rem",
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
    color: "#fff",
    textShadow: "0 1px 6px rgba(20,32,26,0.45)",
  },
  statusChip: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 26,
    paddingInline: 10,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-angel-green-deep)",
    fontSize: "0.75rem",
    fontWeight: 700,
    lineHeight: 1,
    boxShadow: "0 1px 2px rgba(20,32,26,0.18)",
  },

  // Branded empty tile — green-tint→warm-tint, never bare grey.
  emptyTile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(135deg, var(--hb-angel-green-tint) 0%, var(--hb-angel-warm-tint) 100%)",
    fontSize: "2rem",
    opacity: 0.85,
  },

  body: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    paddingInline: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  region: {
    margin: 0,
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "var(--hb-color-text-secondary)",
  },
  cta: {
    marginTop: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    height: 40,
    borderRadius: "var(--hb-radius-control)",
    backgroundColor: {
      default: "var(--hb-angel-green-tint)",
      ":hover": "var(--hb-angel-green-tint-strong)",
    },
    color: "var(--hb-angel-green-deep)",
    fontSize: "0.875rem",
    fontWeight: 700,
    transitionProperty: "background-color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
  },
});
