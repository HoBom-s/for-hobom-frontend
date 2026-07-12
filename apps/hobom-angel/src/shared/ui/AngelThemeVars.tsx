/**
 * Angel brand theme.
 *
 * Angel doesn't fork the design system — it *themes* it. This overrides the
 * core `--hb-color-accent` tokens with the Angel green (so every `Hb.*`
 * component adopts the brand), and adds a few brand-only tokens (green tints,
 * card radius, elevation) that the marketing surface needs beyond the core
 * semantic set. Mount once after the DS `ColorSchemeVars`.
 */
export const ANGEL_THEME_CSS = `:root{` +
  // Retheme the core accent to Angel green.
  `--hb-color-accent:oklch(0.56 0.078 155);` +
  `--hb-color-accent-dark:oklch(0.48 0.075 155);` +
  `--hb-color-accent-contrast:#ffffff;` +
  // Control radius per the Angel spec (buttons/inputs 12–14).
  `--hb-radius-control:12px;` +
  // Brand-only extras (not part of the core semantic set).
  `--hb-angel-green-deep:oklch(0.38 0.06 155);` +
  `--hb-angel-green-tint:oklch(0.95 0.03 155);` +
  `--hb-angel-green-tint-strong:oklch(0.9 0.045 155);` +
  `--hb-angel-surface-alt:oklch(0.978 0.005 80);` +
  `--hb-angel-radius-card:20px;` +
  `--hb-angel-shadow:0 12px 30px -20px rgba(30,45,55,0.4);` +
  `}`;

export const AngelThemeVars = () => <style>{ANGEL_THEME_CSS}</style>;
