/**
 * Angel product brand tokens.
 *
 * The Angel consumer surface uses a warm sage/forest green, distinct from the
 * neutral back-office palette. Exposed as stable `--hb-angel-*` CSS variables
 * (the single source of truth) so both StyleX styles and any inline styles can
 * reference them as literal `var(--hb-angel-*)` strings — mirroring how the
 * core `--hb-color-*` tokens work.
 *
 * Mount `<AngelBrandVars />` once near the app root.
 */
export const ANGEL_BRAND_CSS = `:root{` +
  `--hb-angel-green:#4c7a5b;` +
  `--hb-angel-green-dark:#3c6349;` +
  `--hb-angel-green-deep:#2e4b39;` +
  `--hb-angel-green-tint:#eef4ec;` +
  `--hb-angel-green-tint-strong:#e1ebde;` +
  `--hb-angel-ink:#2c3830;` +
  `--hb-angel-ink-soft:#66756b;` +
  `--hb-angel-line:#e4eae1;` +
  `--hb-angel-surface:#ffffff;` +
  `--hb-angel-surface-alt:#f6f8f4;` +
  `}`;

export const AngelBrandVars = () => <style>{ANGEL_BRAND_CSS}</style>;
