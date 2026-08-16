import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  // Transparent block wrapper so the whole card is one link target; the focus
  // ring lives here since it's the focusable node.
  link: {
    display: "block",
    color: "inherit",
    textDecoration: "none",
    borderRadius: "var(--hb-angel-radius-card)",
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
  },

  // Borderless floating card — resting shadow-sm, hover lifts to shadow-md.
  card: {
    position: "relative",
    height: "100%",
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
    [REDUCE]: {
      animationName: "none",
      transitionProperty: "none",
      transform: { default: "none", ":hover": "none" },
    },
  },
  // Interactive cards (those wrapped in a link) lift on hover.
  cardHoverable: {
    transform: { default: "none", ":hover": "translateY(-3px)" },
    boxShadow: { default: "var(--hb-angel-shadow-sm)", ":hover": "var(--hb-angel-shadow-md)" },
  },

  // Full-bleed rounded media; the name rides a scrim at the bottom.
  media: { position: "relative", lineHeight: 0 },
  scrim: {
    position: "absolute",
    insetInline: 0,
    bottom: 0,
    height: "55%",
    backgroundImage: "var(--hb-angel-photo-scrim)",
    pointerEvents: "none",
  },
  // WHITE name reads against the scrim, bottom-left of the photo.
  name: {
    position: "absolute",
    insetInline: 0,
    bottom: 0,
    margin: 0,
    padding: 14,
    fontSize: "1.125rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-angel-on-photo)",
    textShadow: "var(--hb-angel-on-photo-shadow)",
  },
  // Favorite / action button, overlaid top-right of the media.
  action: { position: "absolute", top: 10, right: 10, zIndex: 1 },
  // Chip / badge overlay, anchored to the media's top-left.
  overlayStart: { position: "absolute", insetBlockStart: 10, insetInlineStart: 10, zIndex: 1 },

  // Body: attribute line on the left, status chip pinned right on the surface.
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingInline: 14,
    paddingTop: 12,
    paddingBottom: 14,
  },
  meta: {
    margin: 0,
    minWidth: 0,
    fontSize: "0.875rem",
    lineHeight: 1.5,
    color: "var(--hb-color-text-secondary)",
  },
});
