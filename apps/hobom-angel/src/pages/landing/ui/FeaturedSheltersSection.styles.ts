// 랜딩 보호소 소개 섹션의 헤드·그리드·스켈레톤 레이아웃 스타일
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
  head: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 18,
  },
  title: {
    margin: 0,
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  lead: {
    margin: 0,
    marginTop: 5,
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
  },
  more: {
    flexShrink: 0,
    fontSize: "0.84375rem",
    fontWeight: 500,
    color: "var(--hb-color-accent)",
  },
  // auto-fit so the row stays full whether the directory returns two or four.
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 14,
  },
  skeletonCard: {
    overflow: "hidden",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  skeletonBody: {
    display: "flex",
    flexDirection: "column",
    gap: 9,
    paddingInline: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
});
