import * as stylex from "@stylexjs/stylex";

// Below this stop the low-value '신청' count column is hidden to avoid crush.
const NARROW = "@media (max-width: 480px)";

export const styles = stylex.create({
  thumb: {
    display: "block",
    width: 40,
    height: 40,
    borderRadius: "var(--hb-angel-radius-sm)",
    objectFit: "cover",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  thumbEmpty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: "var(--hb-angel-radius-sm)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent-dark)",
    fontSize: "1rem",
    lineHeight: 1,
  },
  // Clickable row: calm surface-alt hover tint (no heavy lift on table rows).
  row: {
    cursor: "pointer",
    backgroundColor: { default: null, ":hover": "var(--hb-angel-surface-alt)" },
  },
  // Selected row reads as a soft green (status/trust) tint; wins over hover.
  rowActive: {
    backgroundColor: { default: "var(--hb-angel-green-tint)", ":hover": "var(--hb-angel-green-tint)" },
  },
  // A muted glyph fills the empty thumbnail tile so it never reads as a hole.
  thumbGlyph: {
    fontSize: "0.875rem",
    fontWeight: 700,
    color: "var(--hb-color-accent-dark)",
  },
  nameCell: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  name: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  breed: {
    fontSize: "0.75rem",
    color: "var(--hb-color-text-secondary)",
  },
  // Hidden below 480 so the roster doesn't crush on small phones.
  countCol: {
    display: { default: "table-cell", [NARROW]: "none" },
  },
  // Branded empty state: a green-tint tile, not a bare grey box.
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    margin: 16,
    padding: "40px 24px",
    textAlign: "center",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  emptyKicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent)",
  },
  emptyText: {
    margin: 0,
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
  },
  emptyMeta: {
    margin: 0,
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
});
