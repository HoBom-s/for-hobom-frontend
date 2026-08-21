// Claude Design 보호소 디렉터리의 제목·지역 필터·등록 안내 스타일
import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  root: {
    maxWidth: 1200,
    marginInline: "auto",
    padding: { default: "22px 18px 40px", [DESKTOP]: "34px 40px 60px" },
    backgroundColor: "var(--hb-color-surface)",
  },
  header: { display: "flex", flexDirection: "column" },
  kicker: { display: "none" },
  title: {
    margin: 0,
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.875rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: 0,
    marginTop: 10,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-neutral)",
  },
  registerBanner: {
    display: "flex",
    flexDirection: { default: "column", [TABLET]: "row" },
    alignItems: { default: "stretch", [TABLET]: "center" },
    justifyContent: "space-between",
    gap: 14,
    marginTop: 22,
    padding: "16px 18px",
    borderRadius: 20,
    backgroundColor: "var(--hb-angel-warm-tint)",
  },
  registerCopy: { display: "flex", flexDirection: "column", gap: 3 },
  registerKicker: {
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
  registerText: {
    margin: 0,
    fontSize: "0.8125rem",
    lineHeight: 1.55,
    color: "var(--hb-color-neutral)",
  },
  registerCta: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: 11,
    paddingInline: 18,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
    color: "var(--hb-color-accent-contrast)",
    fontSize: "0.8125rem",
    fontWeight: 600,
    textDecoration: "none",
  },
  controls: {
    display: "flex",
    flexDirection: { default: "column", [TABLET]: "row" },
    alignItems: { default: "stretch", [TABLET]: "center" },
    justifyContent: { [TABLET]: "space-between" },
    gap: 12,
    marginTop: 4,
  },
  viewToggle: { alignSelf: { default: "flex-end", [TABLET]: "auto" } },
  count: { display: "none" },
});
