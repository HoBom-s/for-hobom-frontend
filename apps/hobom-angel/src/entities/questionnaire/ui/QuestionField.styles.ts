import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  prompt: {
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.4375rem",
    lineHeight: 1.45,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  required: {
    color: "var(--hb-angel-accent-warm-dark)",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  option: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 13,
    paddingBlock: 17,
    paddingInline: 19,
    borderWidth: 0,
    borderRadius: 18,
    backgroundColor: { default: "#F8F3EA", ":hover": "var(--hb-angel-surface-alt)" },
    color: "#3F4E45",
    fontFamily: "var(--hb-font-body)",
    fontSize: "0.9375rem",
    fontWeight: 500,
    textAlign: "left",
    cursor: "pointer",
    ":focus-visible": { outline: "none", boxShadow: "var(--hb-angel-focus-ring)" },
  },
  optionSelected: {
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-text-primary)",
  },
  optionDot: {
    width: 20,
    height: 20,
    flexShrink: 0,
    borderRadius: "50%",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "inset 0 0 0 1.5px var(--hb-color-border)",
  },
  optionDotOn: {
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "inset 0 0 0 6px var(--hb-color-accent)",
  },
  counter: {
    alignSelf: "flex-end",
    fontSize: "0.75rem",
    fontVariantNumeric: "tabular-nums",
    color: "var(--hb-color-text-secondary)",
  },
});
