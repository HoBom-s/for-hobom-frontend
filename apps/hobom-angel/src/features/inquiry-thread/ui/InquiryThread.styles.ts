import * as stylex from "@stylexjs/stylex";

const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 760,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 24,
    paddingBottom: 32,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },
  header: { display: "flex", alignItems: "center", gap: 12 },
  back: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: "var(--hb-angel-radius-md)",
    border: "1px solid var(--hb-color-border)",
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    fontSize: "1.125rem",
    textDecoration: "none",
  },
  titleBlock: { display: "flex", flexDirection: "column", gap: 4 },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  kickerDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "var(--hb-angel-accent-warm)",
  },
  title: {
    margin: 0,
    fontSize: "1.375rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  // The scrollable message column.
  thread: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    minHeight: 320,
    padding: "clamp(12px, 3vw, 20px)",
    borderRadius: "var(--hb-angel-radius-card)",
    border: "1px solid var(--hb-color-border)",
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  empty: {
    margin: "auto",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.9375rem",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    maxWidth: "78%",
  },
  rowMine: { alignSelf: "flex-end", alignItems: "flex-end" },
  rowTheirs: { alignSelf: "flex-start", alignItems: "flex-start" },
  bubble: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingInline: 14,
    paddingBlock: 10,
    borderRadius: "var(--hb-angel-radius-md)",
    fontSize: "0.9375rem",
    lineHeight: 1.5,
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  bubbleMine: {
    backgroundColor: "var(--hb-color-accent)",
    color: "var(--hb-color-accent-contrast)",
    borderEndEndRadius: 4,
  },
  bubbleTheirs: {
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    border: "1px solid var(--hb-color-border)",
    borderEndStartRadius: 4,
  },
  sender: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "var(--hb-color-text-secondary)",
  },
  body: { margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" },
  time: {
    fontSize: "0.6875rem",
    color: "var(--hb-color-text-disabled)",
    paddingInline: 4,
  },
  // Composer pinned below the thread.
  composer: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
  },
});
