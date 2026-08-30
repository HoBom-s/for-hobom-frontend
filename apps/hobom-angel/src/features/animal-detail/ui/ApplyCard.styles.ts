import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const pop = stylex.keyframes({
  "0%": { transform: "scale(1)" },
  "50%": { transform: "scale(1.22)" },
  "100%": { transform: "scale(1)" },
});

export const styles = stylex.create({
  // Floating, sticky application panel — the hero decision surface (§02).
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 24,
    borderRadius: 26,
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "var(--hb-angel-shadow-md)",
    position: { default: "static", [DESKTOP]: "sticky" },
    top: { default: "auto", [DESKTOP]: 20 },
  },
  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  // 800 weight reserved for this display name.
  name: {
    margin: 0,
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.75rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  meta: {
    margin: 0,
    fontSize: "0.84375rem",
    lineHeight: 1.5,
    color: "var(--hb-color-text-secondary)",
  },
  badges: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 2,
  },
  // Green-tint trust chips (health verified — status, not emotion).
  badge: {
    paddingBlock: 5,
    paddingInline: 11,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-angel-green-deep)",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "-0.005em",
  },
  // ♡ bookmark — the single warm emotional moment; pops on toggle.
  bookmark: {
    marginInlineStart: "auto",
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: "var(--hb-angel-radius-pill)",
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: {
      default: "var(--hb-angel-surface-alt)",
      ":hover": "var(--hb-angel-warm-tint)",
    },
    color: "var(--hb-color-text-secondary)",
    cursor: "pointer",
    transitionProperty: "background-color, color, transform",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease-spring)",
    ":active": { transform: "scale(0.94)" },
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
    [REDUCE]: { transitionProperty: "background-color, color", ":active": { transform: "none" } },
  },
  bookmarkOn: {
    backgroundColor: "var(--hb-angel-warm-tint)",
    color: "var(--hb-angel-accent-warm-dark)",
    animationName: pop,
    animationDuration: "var(--hb-angel-dur)",
    animationTimingFunction: "var(--hb-angel-ease-spring)",
    [REDUCE]: { animationName: "none" },
  },
  ctas: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 16,
  },
  // Tertiary action — quiet text link centered under the buttons.
  inquiry: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minHeight: 40,
    paddingTop: 8,
    paddingBottom: 0,
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: "var(--hb-angel-radius-sm)",
    backgroundColor: "transparent",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: { default: "var(--hb-color-text-secondary)", ":hover": "var(--hb-color-accent-dark)" },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
  },

  // Owning-shelter shortcut (§02). Links to the shelter microsite by slug.
  shelter: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingBlock: 11,
    paddingInline: 12,
    borderRadius: 18,
    backgroundColor: { default: "#F8F3EA", ":hover": "var(--hb-angel-green-tint)" },
    color: "var(--hb-color-text-primary)",
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
  },
  shelterPin: {
    flexShrink: 0,
    color: "var(--hb-color-accent-dark)",
  },
  shelterInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    minWidth: 0,
    flex: 1,
  },
  shelterName: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  shelterLoc: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  shelterChevron: {
    flexShrink: 0,
    color: "var(--hb-color-text-secondary)",
  },
});
