// Claude Design의 사진 위 상태와 흰색 정보 본문을 재현하는 동물 카드 스타일
import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(8px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

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
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "var(--hb-angel-shadow-md)",
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "var(--hb-angel-dur)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    [REDUCE]: { animationName: "none", transitionProperty: "none" },
  },
  cardHoverable: {
    transform: { default: "none", ":hover": "translateY(-2px)" },
    boxShadow: { default: "var(--hb-angel-shadow-md)", ":hover": "var(--hb-angel-shadow-lg)" },
    [REDUCE]: { transform: { default: "none", ":hover": "none" } },
  },
  media: { position: "relative", lineHeight: 0 },
  status: {
    position: "absolute",
    top: 11,
    left: 11,
    paddingBlock: 5,
    paddingInline: 11,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent)",
    fontSize: "0.71875rem",
    fontWeight: 600,
    lineHeight: 1.2,
  },
  statusReserved: {
    backgroundColor: "var(--hb-angel-warm-tint)",
    color: "#6B4A24",
  },
  action: { position: "absolute", top: 9, right: 9, zIndex: 1 },
  overlayStart: { position: "absolute", top: 10, left: 10, zIndex: 1 },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "15px 17px 17px",
  },
  name: {
    margin: 0,
    fontFamily: "var(--hb-font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1.45,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  meta: {
    margin: 0,
    marginTop: 5,
    minWidth: 0,
    fontSize: "0.78125rem",
    lineHeight: 1.5,
    color: "var(--hb-color-neutral)",
  },
});
