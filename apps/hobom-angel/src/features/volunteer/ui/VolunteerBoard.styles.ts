import * as stylex from "@stylexjs/stylex";

const DESKTOP = "@media (min-width: 900px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const styles = stylex.create({
  root: {
    maxWidth: 1200,
    marginInline: "auto",
    padding: { default: "22px 18px 40px", "@media (min-width: 1024px)": "34px 40px 60px" },
    display: "flex",
    flexDirection: "column",
    gap: 22,
    backgroundColor: "var(--hb-color-surface)",
    animationName: fadeUp,
    animationDuration: "var(--hb-angel-dur-slow)",
    animationTimingFunction: "var(--hb-angel-ease)",
    animationFillMode: "both",
    [REDUCE]: { animationName: "none" },
  },

  // Section header: overline kicker + a 3px×24px accent left-rule under the title.
  header: { display: "flex", flexDirection: "column" },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  titleRow: { display: "flex", alignItems: "center", gap: 12 },
  rule: {
    flexShrink: 0,
    width: 3,
    height: 24,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },
  title: {
    margin: 0,
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.875rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: 0,
    marginTop: 10,
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-neutral)",
  },

  controls: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  listView: { width: "100%" },

  // Calendar on the left (wider), the selected day's events on the right.
  board: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1.4fr 1fr" },
    gap: 24,
    alignItems: "start",
  },
  // Borderless floating calendar surface — resting shadow, warm surface.
  calendarCard: {
    padding: 20,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  listCol: { display: "flex", flexDirection: "column", gap: 14, minHeight: 0 },
  dayTitle: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: "1.0625rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  // Cap the day/upcoming feed so a long list scrolls in place instead of
  // stretching the column past the calendar. Scrollbar hidden for a clean edge.
  scrollArea: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    maxHeight: 560,
    overflowY: "auto",
    paddingRight: 2,
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
  },
});
