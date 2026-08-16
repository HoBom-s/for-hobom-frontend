import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 768px)";
const DESKTOP = "@media (min-width: 900px)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: { default: "column", [DESKTOP]: "row" },
    minHeight: "100dvh",
    // On desktop the shell is a fixed viewport: the sidebar stays put and only
    // the main content scrolls. On phones it falls back to normal page scroll.
    height: { [DESKTOP]: "100dvh" },
    overflow: { [DESKTOP]: "hidden" },
    // White content area; the sidebar keeps its own light rail beside it.
    backgroundColor: "var(--hb-color-surface)",
  },
  sidebar: {
    display: "flex",
    flexDirection: { default: "row", [DESKTOP]: "column" },
    flexWrap: { default: "wrap", [DESKTOP]: "nowrap" },
    alignItems: { default: "center", [TABLET]: "flex-start", [DESKTOP]: "stretch" },
    flexShrink: 0,
    width: { default: "100%", [DESKTOP]: 240 },
    boxSizing: "border-box",
    padding: 14,
    gap: { default: 8, [DESKTOP]: 10 },
    overflowY: { [DESKTOP]: "auto" },
    // Retire the flat 1px seams: a soft float edge instead of a fenced hairline.
    // Below desktop the rail is a top strip — the shadow reads underneath it;
    // on desktop it hugs the inline-end so the white pane floats beside the rail.
    boxShadow: { default: "var(--hb-angel-shadow-sm)", [DESKTOP]: "var(--hb-angel-shadow-sm)" },
    // Light warm rail so the active (tinted) item reads as raised.
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "6px 8px 10px",
    width: { default: "100%", [DESKTOP]: "auto" },
  },
  logo: {
    width: 28,
    height: 28,
    flexShrink: 0,
    borderRadius: "var(--hb-angel-radius-sm)",
    backgroundColor: "var(--hb-color-accent)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 3,
    minWidth: 0,
  },
  brandTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  // 관리자 — a green trust/status chip (matches the operator OPERATOR chip).
  brandRole: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 8px",
    borderRadius: "var(--hb-angel-radius-pill)",
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "var(--hb-color-accent-dark)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  nav: {
    display: "flex",
    flexDirection: { default: "row", [DESKTOP]: "column" },
    flexWrap: { default: "wrap", [DESKTOP]: "nowrap" },
    gap: { default: 6, [DESKTOP]: 3 },
    flex: 1,
    width: { default: "100%", [DESKTOP]: "auto" },
  },
  itemLink: {
    display: "block",
    borderRadius: "var(--hb-angel-radius-control)",
    textDecoration: "none",
    // Keep the focus ring intact via an inset shadow so it is never clipped by
    // the desktop shell's overflow:hidden.
    outline: "none",
    boxShadow: { ":focus-visible": "var(--hb-angel-focus-ring)" },
  },
  item: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 1,
    minHeight: 40,
    justifyContent: "center",
    padding: "9px 12px",
    borderRadius: "var(--hb-angel-radius-control)",
    color: "var(--hb-color-text-primary)",
    backgroundColor: { default: "transparent", ":hover": "var(--hb-color-surface)" },
    transitionProperty: { default: "background-color, box-shadow", [REDUCED_MOTION]: "none" },
    transitionDuration: { default: "var(--hb-angel-dur)", [REDUCED_MOTION]: "0ms" },
    transitionTimingFunction: "var(--hb-angel-ease)",
  },
  // Selected menu — a soft green tint, dark-green text, brand left accent-rule.
  itemActive: {
    color: "var(--hb-color-accent-dark)",
    backgroundColor: {
      default: "var(--hb-angel-green-tint)",
      ":hover": "var(--hb-angel-green-tint)",
    },
    boxShadow: "inset 3px 0 0 var(--hb-color-accent)",
  },
  itemDisabled: {
    cursor: "default",
    backgroundColor: { default: "transparent", ":hover": "transparent" },
  },
  itemLabel: {
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "inherit",
  },
  itemHint: {
    fontSize: "0.75rem",
    color: "inherit",
    opacity: 0.65,
  },
  // 준비 중 — a legible warm-neutral chip, not a faded caption.
  itemSoon: {
    alignSelf: "flex-start",
    marginTop: 2,
    padding: "1px 7px",
    borderRadius: "var(--hb-angel-radius-pill)",
    fontSize: "0.6875rem",
    fontWeight: 700,
    color: "var(--hb-color-text-secondary)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  foot: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: { default: "100%", [DESKTOP]: "auto" },
    paddingTop: 10,
  },
  // A branded trust tile — the scope note reads as a green status marker.
  scope: {
    padding: "8px 10px",
    borderRadius: "var(--hb-angel-radius-sm)",
    fontSize: "0.6875rem",
    lineHeight: 1.4,
    color: "var(--hb-color-text-secondary)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  // A clear, soft-elevated way back to the consumer app.
  exit: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: "9px 12px",
    borderRadius: "var(--hb-angel-radius-control)",
    textAlign: "center",
    fontSize: "0.875rem",
    fontWeight: 600,
    textDecoration: "none",
    color: "var(--hb-color-text-primary)",
    backgroundColor: "var(--hb-color-surface)",
    outline: "none",
    boxShadow: {
      default: "var(--hb-angel-shadow-sm)",
      ":hover": "var(--hb-angel-shadow-md)",
      ":focus-visible": "var(--hb-angel-focus-ring)",
    },
    transitionProperty: { default: "box-shadow", [REDUCED_MOTION]: "none" },
    transitionDuration: { default: "var(--hb-angel-dur)", [REDUCED_MOTION]: "0ms" },
    transitionTimingFunction: "var(--hb-angel-ease)",
  },
  main: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    // A fixed pane on desktop so each screen manages its own scroll regions;
    // normal page scroll on phones.
    display: "flex",
    flexDirection: "column",
    overflowY: { default: "visible", [DESKTOP]: "hidden" },
    padding: "clamp(16px, 4vw, 32px)",
  },
});
