// Claude Design 보호소 카드의 흰색 본문과 녹색 신뢰등급 스타일
import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

export const styles = stylex.create({
  link: {
    display: "block",
    height: "100%",
    color: "inherit",
    textDecoration: "none",
    borderRadius: "var(--hb-angel-radius-card)",
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
  },
  card: {
    height: "100%",
    overflow: "hidden",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "var(--hb-angel-shadow-md)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    transform: { default: "none", ":hover": "translateY(-2px)" },
    [REDUCE]: { transitionProperty: "none", transform: "none" },
  },
  emptyTile: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "repeating-linear-gradient(135deg,#EDE4D6 0 9px,#F5EFE5 9px 18px)",
    color: "#A79C8B",
    fontFamily: "var(--hb-font-display)",
    fontSize: "2rem",
  },
  body: { padding: "17px 19px 19px" },
  nameRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  name: {
    margin: 0,
    fontFamily: "var(--hb-font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
  tier: {
    paddingBlock: 4,
    paddingInline: 10,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent)",
    fontSize: "0.6875rem",
    fontWeight: 600,
  },
  region: {
    margin: 0,
    marginTop: 9,
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: "0.78125rem",
    color: "#8A9187",
  },
});
