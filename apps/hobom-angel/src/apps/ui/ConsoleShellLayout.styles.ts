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
    backgroundColor: "#F7F2E9",
  },
  sidebar: {
    display: "flex",
    flexDirection: { default: "row", [DESKTOP]: "column" },
    flexWrap: { default: "wrap", [DESKTOP]: "nowrap" },
    alignItems: { default: "center", [TABLET]: "flex-start", [DESKTOP]: "stretch" },
    flexShrink: 0,
    width: { default: "100%", [DESKTOP]: 252 },
    boxSizing: "border-box",
    padding: { default: 14, [DESKTOP]: "24px 20px" },
    gap: { default: 8, [DESKTOP]: 22 },
    overflowY: { [DESKTOP]: "auto" },
    // Retire the flat 1px seams: a soft float edge instead of a fenced hairline.
    // Below desktop the rail is a top strip — the shadow reads underneath it;
    // on desktop it hugs the inline-end so the white pane floats beside the rail.
    boxShadow: "none",
    backgroundImage: "linear-gradient(180deg,#25573F,#1B4433)",
    color: "#F2F7F2",
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
    backgroundColor: "rgba(242,247,242,0.16)",
    boxShadow: "none",
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
    color: "#F2F7F2",
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
    color: "rgba(242,247,242,0.60)",
    backgroundColor: "transparent",
  },
  nav: {
    display: "flex",
    flexDirection: { default: "row", [DESKTOP]: "column" },
    flexWrap: { default: "wrap", [DESKTOP]: "nowrap" },
    gap: 3,
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
    color: "rgba(242,247,242,0.72)",
    backgroundColor: { default: "transparent", ":hover": "rgba(242,247,242,0.10)" },
    transitionProperty: { default: "background-color, box-shadow", [REDUCED_MOTION]: "none" },
    transitionDuration: { default: "var(--hb-angel-dur)", [REDUCED_MOTION]: "0ms" },
    transitionTimingFunction: "var(--hb-angel-ease)",
  },
  // Selected menu — a soft green tint, dark-green text, brand left accent-rule.
  itemActive: {
    color: "var(--hb-color-text-primary)",
    backgroundColor: {
      default: "var(--hb-color-surface)",
      ":hover": "var(--hb-color-surface)",
    },
    boxShadow: "none",
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
    color: "rgba(242,247,242,0.72)",
    backgroundColor: "rgba(242,247,242,0.10)",
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
    color: "rgba(242,247,242,0.82)",
    backgroundColor: "transparent",
    outline: "none",
    boxShadow: {
      default: "none",
      ":hover": "none",
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
    padding: { default: 16, [DESKTOP]: "34px 40px 60px" },
    backgroundColor: "#F7F2E9",
  },
});
