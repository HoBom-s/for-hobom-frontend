// Claude Design 동물 목록의 흰색 검색·필터 패널 스타일
import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBlockStart: 24,
    padding: 14,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  bar: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 13,
  },
  search: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    width: "100%",
  },
  searchField: {
    flex: 1,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  right: {
    display: { default: "none", [DESKTOP]: "flex" },
    alignItems: "center",
    gap: 6,
    marginInlineStart: "auto",
  },
  sortTrigger: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    minHeight: 38,
    paddingInline: 15,
    borderWidth: 0,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-surface-alt)",
    fontSize: "0.84375rem",
    fontWeight: 500,
    fontFamily: "inherit",
    color: "var(--hb-color-text-secondary)",
    cursor: "pointer",
    outline: "none",
    ":focus-visible": { boxShadow: "var(--hb-angel-focus-ring)" },
  },
  sortCaret: { color: "var(--hb-color-text-secondary)" },
});
