// 카드 대신 선과 번호로 입양 과정을 구성하는 편집형 목록 스타일
import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  section: {
    paddingBlock: "var(--hb-angel-space-section)",
    paddingInline: "clamp(16px, 5vw, 64px)",
    backgroundColor: "var(--hb-color-surface)",
  },
  inner: { maxWidth: 1200, marginInline: "auto" },
  head: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "0.45fr 1fr" },
    alignItems: "end",
    gap: { default: 10, [TABLET]: 32 },
    marginBottom: 46,
  },
  kicker: {
    gridRow: { [TABLET]: "1 / span 2" },
    fontFamily: "var(--hb-font-mono, ui-monospace, monospace)",
    fontSize: "0.6875rem",
    fontWeight: 800,
    letterSpacing: "0.08em",
    color: "var(--hb-angel-urgent)",
  },
  title: {
    margin: 0,
    fontSize: { default: "2.25rem", [DESKTOP]: "3.25rem" },
    fontWeight: 900,
    lineHeight: 1.08,
    letterSpacing: "-0.045em",
    color: "var(--hb-color-text-primary)",
  },
  sub: {
    margin: 0,
    maxWidth: 430,
    justifySelf: { [TABLET]: "end" },
    fontSize: "0.9375rem",
    lineHeight: 1.7,
    color: "var(--hb-color-text-secondary)",
  },
  steps: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-color-text-primary)",
  },
  step: {
    display: "grid",
    gridTemplateColumns: { default: "52px 1fr", [TABLET]: "90px 0.75fr 1.25fr" },
    alignItems: "baseline",
    gap: { default: "8px 12px", [TABLET]: 28 },
    paddingBlock: { default: 24, [TABLET]: 30 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-text-primary)",
    textAlign: "left",
  },
  num: {
    fontFamily: "var(--hb-font-mono, ui-monospace, monospace)",
    fontSize: "0.8125rem",
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
    color: "var(--hb-angel-urgent)",
  },
  stepTitle: {
    margin: 0,
    fontSize: { default: "1.25rem", [TABLET]: "1.5rem" },
    fontWeight: 800,
    color: "var(--hb-color-text-primary)",
  },
  desc: {
    margin: 0,
    gridColumn: { default: "2", [TABLET]: "auto" },
    fontSize: "0.9375rem",
    lineHeight: 1.7,
    color: "var(--hb-color-text-secondary)",
  },
});
