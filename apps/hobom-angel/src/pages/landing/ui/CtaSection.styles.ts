// Claude Design 홈 CTA의 녹색 그라디언트·여백·텍스트 스타일
import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  section: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingTop: 44,
    paddingInline: { default: 20, [DESKTOP]: 40 },
    backgroundColor: "var(--hb-color-surface)",
  },
  inner: {
    overflow: "hidden",
    padding: { default: "30px 24px", [DESKTOP]: "48px 46px" },
    borderRadius: 26,
    backgroundImage: "var(--hb-angel-cta-gradient)",
    color: "var(--hb-color-accent-contrast)",
  },
  title: {
    margin: 0,
    maxWidth: "26rem",
    fontFamily: "var(--hb-font-display)",
    fontSize: { default: "1.5rem", [DESKTOP]: "1.9375rem" },
    lineHeight: 1.35,
    fontWeight: 700,
    color: "#F2F7F2",
  },
  lead: {
    margin: 0,
    marginTop: 14,
    maxWidth: "30rem",
    fontSize: "0.9375rem",
    lineHeight: 1.7,
    color: "rgba(242,247,242,0.82)",
  },
});
