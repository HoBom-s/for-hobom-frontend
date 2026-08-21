// 누적 성과를 잉크색 기록 띠로 표현하는 통계 섹션 스타일
import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";

export const styles = stylex.create({
  section: {
    paddingInline: "clamp(16px, 5vw, 64px)",
    backgroundColor: "var(--hb-color-text-primary)",
  },
  card: {
    maxWidth: 1200,
    margin: 0,
    marginInline: "auto",
    paddingBlock: { default: 28, [TABLET]: 38 },
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: "var(--hb-color-text-disabled)",
  },
  itemFirst: { borderLeftWidth: 0 },
  value: {
    order: 1,
    margin: 0,
    fontFamily: "var(--hb-font-mono, ui-monospace, monospace)",
    fontSize: { default: "1.6rem", [TABLET]: "2.4rem" },
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: "var(--hb-color-surface)",
    fontVariantNumeric: "tabular-nums",
  },
  label: {
    order: 2,
    marginTop: 7,
    fontSize: { default: "0.6875rem", [TABLET]: "0.8125rem" },
    fontWeight: 600,
    color: "var(--hb-color-text-disabled)",
  },
});
