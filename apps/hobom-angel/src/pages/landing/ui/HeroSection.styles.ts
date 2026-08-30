// Claude Design 홈 히어로의 타이포그래피·사진·배지 레이아웃
import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 960px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const enter = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(10px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  section: {
    paddingBlock: { default: "22px 30px", [DESKTOP]: "40px 46px" },
    paddingInline: { default: 20, [DESKTOP]: 40 },
    backgroundColor: "var(--hb-color-surface)",
  },
  inner: {
    maxWidth: 1120,
    marginInline: "auto",
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1.05fr 0.95fr" },
    alignItems: "center",
    gap: 34,
  },
  copy: {
    animationName: enter,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    paddingBlock: 6,
    paddingInline: "8px 13px",
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent)",
    fontSize: "0.78125rem",
    fontWeight: 500,
  },
  kickerDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "var(--hb-color-success)",
  },
  title: {
    margin: 0,
    marginTop: 20,
    fontFamily: "var(--hb-font-display)",
    fontSize: { default: "2.125rem", [TABLET]: "2.75rem", [DESKTOP]: "3.125rem" },
    lineHeight: 1.22,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
    textWrap: "pretty",
  },
  titleAccent: { color: "var(--hb-color-accent)" },
  lead: {
    margin: 0,
    marginTop: 20,
    maxWidth: "34rem",
    fontSize: "1rem",
    lineHeight: 1.75,
    color: "var(--hb-color-text-secondary)",
    textWrap: "pretty",
  },
  cta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 28,
  },
  visual: {
    position: "relative",
    margin: 0,
    width: "100%",
    animationName: enter,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationDelay: "70ms",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  photoFrame: {
    overflow: "hidden",
    aspectRatio: "20 / 17",
    borderRadius: 26,
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  photo: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
