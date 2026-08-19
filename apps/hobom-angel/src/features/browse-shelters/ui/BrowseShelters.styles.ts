import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

// The directory content lifts in on mount; stilled under reduced-motion.
const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(10px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingBlock: "clamp(24px, 4vw, 40px)",
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    [REDUCE]: { animationName: "none" },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    // Overline + 3px×24px accent left-rule (design signature).
    paddingLeft: 16,
    position: "relative",
    marginBottom: "var(--hb-angel-space-header)",
    "::before": {
      content: "''",
      position: "absolute",
      insetInlineStart: 0,
      top: 4,
      width: 3,
      height: 24,
      borderRadius: "var(--hb-angel-radius-pill)",
      backgroundColor: "var(--hb-color-accent)",
    },
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  title: {
    margin: 0,
    fontSize: { default: "1.5rem", [TABLET]: "1.625rem" },
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: 0,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "1.0625rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  // Operator entry point: a soft brand-wash CTA banner inviting shelter owners
  // to open a verification. Row on tablet+, stacked (CTA full-width) on phones.
  registerBanner: {
    display: "flex",
    flexDirection: { default: "column", [TABLET]: "row" },
    alignItems: { default: "stretch", [TABLET]: "center" },
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20,
    padding: "clamp(16px, 3vw, 22px)",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundImage: "var(--hb-angel-hero-wash)",
    border: "1px solid var(--hb-angel-green-tint)",
  },
  registerCopy: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  registerKicker: {
    fontSize: "1.0625rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  registerText: {
    margin: 0,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "0.9375rem",
    lineHeight: 1.55,
    color: "var(--hb-color-text-secondary)",
  },
  // Link styled as a primary CTA — full-width on phones, hugs content on tablet+.
  registerCta: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textDecoration: "none",
    paddingInline: 20,
    paddingBlock: 12,
    borderRadius: "var(--hb-radius-control)",
    color: "var(--hb-color-accent-contrast)",
    fontSize: "0.9375rem",
    fontWeight: 700,
    whiteSpace: "nowrap",
    boxShadow: "var(--hb-angel-shadow-sm)",
    transitionProperty: "background-color, transform",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    backgroundColor: {
      default: "var(--hb-color-accent)",
      ":hover": "var(--hb-color-accent-dark)",
    },
    transform: { default: "none", ":active": "translateY(1px)" },
    [REDUCE]: { transitionProperty: "none" },
  },
  // Region filter and the grid/map toggle: side by side on tablet+, stacked on
  // phones (filter scrolls horizontally, toggle pinned to the right).
  controls: {
    display: "flex",
    flexDirection: { default: "column", [TABLET]: "row" },
    alignItems: { default: "stretch", [TABLET]: "center" },
    justifyContent: { [TABLET]: "space-between" },
    gap: { default: 4, [TABLET]: 12 },
  },
  viewToggle: {
    alignSelf: { default: "flex-end", [TABLET]: "auto" },
    marginBlockEnd: { default: 12, [TABLET]: 0 },
  },
  // Result count as a quiet green-tint proof chip.
  count: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginBlock: 20,
    paddingInline: 12,
    paddingBlock: 6,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-angel-green-deep)",
    fontSize: "0.875rem",
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
  },
});
