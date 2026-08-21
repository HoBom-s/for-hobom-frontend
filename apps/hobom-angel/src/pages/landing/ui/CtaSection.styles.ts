// 둥근 카드와 그라디언트 없이 다음 행동을 강조하는 편집형 CTA 스타일
import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  section: {
    paddingBlock: "var(--hb-angel-space-section)",
    paddingInline: "clamp(16px, 5vw, 64px)",
    backgroundColor: "var(--hb-color-bg)",
  },
  inner: {
    maxWidth: 1200,
    marginInline: "auto",
    paddingBlock: { default: 52, [DESKTOP]: 76 },
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-color-text-primary)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-text-primary)",
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1fr auto" },
    alignItems: "end",
    gap: { default: 32, [DESKTOP]: 52 },
    textAlign: "left",
    color: "var(--hb-color-text-primary)",
  },
  copy: { maxWidth: 780 },
  kicker: {
    display: "block",
    marginBottom: 18,
    fontFamily: "var(--hb-font-mono, ui-monospace, monospace)",
    fontSize: "0.6875rem",
    fontWeight: 800,
    letterSpacing: "0.08em",
    color: "var(--hb-angel-urgent)",
  },
  title: {
    margin: 0,
    fontSize: { default: "2.5rem", [DESKTOP]: "4.5rem" },
    fontWeight: 900,
    lineHeight: 1.04,
    letterSpacing: "-0.055em",
  },
  lead: {
    margin: 0,
    marginTop: 18,
    maxWidth: 530,
    fontSize: "1rem",
    lineHeight: 1.7,
    color: "var(--hb-color-text-secondary)",
  },
});
