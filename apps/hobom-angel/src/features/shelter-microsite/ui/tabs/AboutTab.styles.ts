import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

export const styles = stylex.create({
  // Main content + sidebar (§04 design: 1.5fr / 1fr).
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1.5fr 1fr" },
    gap: 24,
    alignItems: "start",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    minWidth: 0,
  },

  // Borderless floating section card.
  card: {
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
    padding: { default: 20, [TABLET]: 24 },
  },
  // Sidebar sticks on desktop so the visit/support panel stays in view.
  sidebar: {
    position: { [DESKTOP]: "sticky" },
    top: { [DESKTOP]: 20 },
  },

  // Section header: overline kicker + 3px×24px accent left-rule.
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  headText: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  kicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  rule: {
    display: "inline-block",
    width: 3,
    height: 24,
    flexShrink: 0,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-color-accent)",
  },

  preview: {
    display: "grid",
    gridTemplateColumns: { default: "repeat(2, 1fr)", [DESKTOP]: "repeat(4, 1fr)" },
    gap: 12,
  },

  sidebarGuides: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  cta: {
    marginTop: 20,
  },
});
