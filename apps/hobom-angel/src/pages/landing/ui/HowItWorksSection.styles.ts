// Claude Design의 녹색 패널과 흰색 단계 카드 스타일
import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  section: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingTop: 52,
    paddingInline: { default: 20, [DESKTOP]: 40 },
    backgroundColor: "var(--hb-color-surface)",
  },
  inner: {
    padding: { default: "24px 20px", [DESKTOP]: "34px 36px" },
    borderRadius: 26,
    backgroundColor: "#EEF3EC",
  },
  title: {
    margin: 0,
    marginBottom: 22,
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.4375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  steps: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gridTemplateColumns: { default: "1fr", [TABLET]: "repeat(3,1fr)" },
    gap: 12,
  },
  step: {
    paddingBlock: 22,
    paddingInline: 24,
    borderRadius: 20,
    backgroundColor: "var(--hb-color-surface)",
  },
  num: {
    width: 30,
    height: 30,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "var(--hb-color-accent)",
    color: "var(--hb-color-accent-contrast)",
    fontSize: "0.875rem",
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
  },
  stepTitle: {
    margin: 0,
    marginTop: 14,
    fontFamily: "var(--hb-font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
  desc: {
    margin: 0,
    marginTop: 7,
    fontSize: "0.84375rem",
    lineHeight: 1.65,
    color: "var(--hb-color-neutral)",
  },
});
