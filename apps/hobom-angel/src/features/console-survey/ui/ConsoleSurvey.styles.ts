import * as stylex from "@stylexjs/stylex";

const WIDE = "@media (min-width: 1024px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

export const styles = stylex.create({
  // The console main is a fixed pane; this screen owns its own vertical scroll.
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: { [WIDE]: "100%" },
    minHeight: 0,
  },
  // Section header with the Angel overline kicker + 3px×24px accent left-rule.
  header: {
    position: "relative",
    paddingLeft: 16,
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
    display: "block",
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
    marginBottom: 6,
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    color: "var(--hb-color-text-primary)",
  },
  subtitle: {
    margin: "6px 0 0",
    maxWidth: "var(--hb-angel-measure)",
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--hb-color-text-secondary)",
  },
  purposeTabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: 40,
    padding: "0 16px",
    borderRadius: "var(--hb-angel-radius-pill)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "transparent",
      ":hover": "transparent",
    },
    fontSize: "0.875rem",
    fontWeight: 600,
    fontFamily: "inherit",
    color: {
      default: "var(--hb-color-text-secondary)",
      ":hover": "var(--hb-color-text-primary)",
    },
    backgroundColor: {
      default: "var(--hb-angel-surface-alt)",
      ":hover": "var(--hb-angel-green-tint)",
    },
    cursor: "pointer",
    transitionProperty: "background-color, color, border-color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    outline: { ":focus-visible": "none" },
    boxShadow: { ":focus-visible": "var(--hb-angel-focus-ring)" },
    [REDUCE]: { transitionProperty: "none" },
  },
  tabActive: {
    color: "var(--hb-color-accent-dark)",
    borderColor: "var(--hb-color-accent)",
    backgroundColor: {
      default: "var(--hb-angel-green-tint)",
      ":hover": "var(--hb-angel-green-tint)",
    },
  },
  builder: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    flex: { [WIDE]: 1 },
  },
  // Publish bar: version state on the left, draft/publish actions on the right.
  // Sticky floating toolbar — soft float replaces the old hairline seam.
  topBar: {
    position: "sticky",
    top: 0,
    zIndex: 2,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    marginBottom: 12,
    borderRadius: "var(--hb-angel-radius-md)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  // A quiet save-status cluster: a state dot, the version, and a plain caption.
  status: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: "var(--hb-angel-radius-pill)",
    flexShrink: 0,
  },
  statusDotSaved: {
    backgroundColor: "var(--hb-color-accent)",
  },
  statusDotDraft: {
    backgroundColor: "var(--hb-angel-accent-warm)",
  },
  statusVersion: {
    fontSize: "0.875rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  statusCaption: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  topSpacer: {
    flex: 1,
  },
  // Builder on the left, live applicant preview on the right.
  panes: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [WIDE]: "1fr 1fr" },
    gap: 16,
    minHeight: 0,
    flex: { [WIDE]: 1 },
  },
  pane: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    minHeight: 0,
    overflowY: { [WIDE]: "auto" },
    // `overflow-y: auto` computes overflow-x to auto as well, so this column is a
    // scroll container that clips at its edges — shaving the cards' hover shadow
    // and selected ring. Pad the scroll box, then pull the padding back out so
    // the cards stay exactly where they were.
    padding: { default: 0, [WIDE]: 8 },
    margin: { default: 0, [WIDE]: -8 },
  },
  paneHeading: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    margin: 0,
    fontSize: "0.9375rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  paneCount: {
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "var(--hb-color-text-secondary)",
  },
  // Field list.
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  // Borderless soft-fill row; float lifts on hover.
  fieldRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: "var(--hb-angel-radius-md)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    backgroundColor: "var(--hb-angel-surface-alt)",
    boxShadow: { default: "none", ":hover": "var(--hb-angel-shadow-sm)" },
    transform: { default: "none", ":hover": "translateY(-2px)" },
    textAlign: "start",
    fontFamily: "inherit",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
    transitionProperty: "box-shadow, transform, background-color, border-color",
    transitionDuration: "var(--hb-angel-dur-fast)",
    transitionTimingFunction: "var(--hb-angel-ease)",
    outline: { ":focus-visible": "none" },
    [REDUCE]: { transform: "none", transitionProperty: "box-shadow, background-color, border-color" },
  },
  fieldRowFocus: {
    boxShadow: { ":focus-visible": "var(--hb-angel-focus-ring)" },
  },
  fieldRowActive: {
    borderColor: "var(--hb-color-accent)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  // Invalid reads as "needs attention", not just a red hairline.
  fieldRowInvalid: {
    borderColor: "var(--hb-angel-urgent)",
    backgroundColor: "var(--hb-angel-urgent-tint)",
  },
  handle: {
    fontSize: "1rem",
    color: "var(--hb-color-text-disabled)",
    lineHeight: 1,
  },
  fieldText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
    flex: 1,
  },
  fieldTitle: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "var(--hb-color-text-primary)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fieldTitlePlaceholder: {
    color: "var(--hb-color-text-disabled)",
    fontWeight: 500,
  },
  fieldMeta: {
    fontFamily: "var(--hb-font-mono, ui-monospace, monospace)",
    fontSize: "0.6875rem",
    color: "var(--hb-color-text-secondary)",
  },
  // Branded empty tile — a green-tint prompt, not a bare dashed grey box.
  emptyList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "24px 16px",
    textAlign: "center",
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.875rem",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  emptyKicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  // Palette of field types to add.
  palette: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    paddingTop: 4,
  },
  paletteLabel: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
    marginRight: 2,
  },
  // Selected-field editor — a soft-float panel.
  editor: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 14,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-surface-alt)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  editorTitle: {
    margin: 0,
    fontSize: "0.8125rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--hb-color-text-primary)",
  },
  // Branded hint tile mirroring the empty-list treatment.
  editorHint: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "24px 16px",
    textAlign: "center",
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  label: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--hb-color-text-secondary)",
  },
  check: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: "0.875rem",
    color: "var(--hb-color-text-primary)",
    cursor: "pointer",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  optionRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  optionInput: {
    flex: 1,
  },
  error: {
    fontSize: "0.75rem",
    color: "var(--hb-angel-urgent)",
  },
  // Preview pane — the applicant's view, on a soft-float panel.
  preview: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 18,
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-angel-surface-alt)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  // Branded empty tile for the preview pane.
  previewEmpty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "24px 16px",
    textAlign: "center",
    fontSize: "0.875rem",
    color: "var(--hb-color-text-secondary)",
    borderRadius: "var(--hb-angel-radius-md)",
    backgroundColor: "var(--hb-angel-green-tint)",
  },
  previewEmptyKicker: {
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--hb-color-accent-dark)",
  },
  // The preview mirrors the applicant funnel but isn't answerable here.
  previewLock: {
    pointerEvents: "none",
    userSelect: "none",
  },
});
