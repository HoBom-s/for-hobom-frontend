// Claude Design 동물 목록의 페이지 제목·설명·결과 행 스타일
import * as stylex from "@stylexjs/stylex";

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
  rule: { display: "none" },
  lead: {
    margin: 0,
    marginTop: 10,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-neutral)",
  },
  resultRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginBlockStart: 22,
    marginBlockEnd: 12,
    paddingInline: 2,
  },
  count: {
    fontSize: "0.84375rem",
    color: "var(--hb-color-neutral)",
    marginInlineEnd: 4,
  },
});
