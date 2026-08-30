// Claude Design의 밝은 종이색 바탕에 기존 푸터 콘텐츠를 배치하는 스타일
import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";
const WIDE = "@media (min-width: 1200px)";

export const styles = stylex.create({
  root: {
    display: { default: "none", [DESKTOP]: "block" },
    marginTop: 60,
    backgroundColor: "var(--hb-angel-footer)",
    color: "var(--hb-color-text-secondary)",
  },
  top: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingBlock: 34,
    paddingInline: 30,
    display: "grid",
    gridTemplateColumns: { default: "1.4fr 1fr 1fr", [WIDE]: "1.6fr 1fr 1fr 1fr" },
    gap: 26,
    alignItems: "start",
  },
  brand: { gridColumn: { default: "1 / -1", [WIDE]: "auto" }, minWidth: 200 },
  brandRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  logo: { display: "none" },
  brandName: {
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.0625rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  brandDesc: {
    margin: 0,
    maxWidth: 300,
    fontSize: "0.78125rem",
    lineHeight: 1.7,
    color: "var(--hb-color-neutral)",
  },
  socials: { display: "none" },
  social: { display: "none" },
  colHeading: {
    margin: 0,
    marginBottom: 10,
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.02em",
    color: "var(--hb-color-text-primary)",
  },
  colLinks: { display: "flex", flexDirection: "column", gap: 9 },
  link: {
    width: "fit-content",
    fontSize: "0.8125rem",
    lineHeight: 1.5,
    textDecoration: "none",
    cursor: "pointer",
    color: { default: "var(--hb-color-text-secondary)", ":hover": "var(--hb-color-accent)" },
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
  },
  bottom: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-angel-footer-border)",
    color: "var(--hb-color-neutral)",
    fontSize: "0.75rem",
  },
  bottomInner: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingBlock: 16,
    paddingInline: 30,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  legal: { display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" },
  copyright: { color: "var(--hb-color-neutral)" },
});
