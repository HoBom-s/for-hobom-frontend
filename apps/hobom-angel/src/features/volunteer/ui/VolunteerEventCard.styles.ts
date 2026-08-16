import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  // Borderless floating card — resting shadow-sm, hover lifts to shadow-md.
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    overflow: "hidden",
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":hover": { transform: "translateY(-3px)", boxShadow: "var(--hb-angel-shadow-md)" },
    [REDUCE]: {
      animationName: "none",
      transitionProperty: "none",
      ":hover": { transform: "none" },
    },
  },

  // Branded green-tint→warm-tint header tile carrying the WHITE title on a scrim.
  media: {
    position: "relative",
    minHeight: 132,
    display: "flex",
    padding: 16,
    backgroundImage:
      "linear-gradient(135deg, var(--hb-angel-green-tint-strong) 0%, var(--hb-angel-warm-tint) 100%)",
  },
  mediaScrim: {
    position: "absolute",
    insetInline: 0,
    bottom: 0,
    height: "72%",
    backgroundImage: "var(--hb-angel-photo-scrim)",
    pointerEvents: "none",
  },
  // Status chips float top-right over the tile.
  mediaChips: {
    position: "absolute",
    top: 12,
    right: 12,
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  // Title reads WHITE against the scrim at the bottom of the tile.
  titleWrap: {
    position: "relative",
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: "100%",
  },
  typeChip: { alignSelf: "flex-start" },
  title: {
    margin: 0,
    fontSize: "1.125rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "#ffffff",
    textShadow: "0 1px 6px rgba(20,30,25,0.45)",
  },

  // Body on the warm surface.
  body: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 16,
  },
  shelterLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    textDecoration: "none",
    color: "var(--hb-color-text-secondary)",
    ":hover": { color: "var(--hb-color-accent-dark)" },
  },
  metaRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
  },
  clamp: {
    margin: 0,
    fontSize: "0.9375rem",
    lineHeight: 1.55,
    color: "var(--hb-color-text-secondary)",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  more: {
    alignSelf: "flex-start",
    padding: 0,
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: "transparent",
    color: "var(--hb-color-accent-dark)",
    fontSize: "0.8125rem",
    fontWeight: 700,
    cursor: "pointer",
    transitionProperty: "opacity",
    transitionDuration: "var(--hb-angel-dur-fast)",
    ":hover": { opacity: 0.72 },
  },

  captionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 2,
  },
  caption: {
    fontSize: "0.8125rem",
    fontVariantNumeric: "tabular-nums",
    color: "var(--hb-color-text-secondary)",
  },
});
