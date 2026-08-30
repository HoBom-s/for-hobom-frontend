// Claude Design의 흰색 3열 누적 성과 카드 스타일
import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";

export const styles = stylex.create({
  section: {
    paddingInline: { default: 20, [TABLET]: 40 },
    paddingBottom: 8,
    backgroundColor: "var(--hb-color-surface)",
  },
  card: {
    maxWidth: 1120,
    margin: 0,
    marginInline: "auto",
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "repeat(3,1fr)" },
    gap: 12,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    paddingBlock: 24,
    paddingInline: 26,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  itemFirst: {},
  value: {
    order: 1,
    margin: 0,
    fontFamily: "var(--hb-font-display)",
    fontSize: "2rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
    fontVariantNumeric: "tabular-nums",
  },
  label: {
    order: 2,
    marginTop: 6,
    fontSize: "0.84375rem",
    color: "var(--hb-color-neutral)",
  },
});
