import { semantic, type SemanticTokens } from "./semantic";

/**
 * Semantic color tokens exposed as stable CSS custom properties.
 *
 * Unlike StyleX's hashed vars, these have fixed names, so both StyleX styles
 * (`token.color.border`) and consumer inline styles / codemodded `sx`
 * (`var(--hb-color-border)`) can reference them and still flip in dark mode.
 *
 * Values come from `./semantic` (single source). Light values live on `:root`;
 * the dark values apply under the `data-hb-scheme="dark"` attribute, which the
 * app sets from its color-scheme state.
 */
export const SCHEME_ATTR = "data-hb-scheme";

const VARS = {
  canvas: "--hb-color-canvas",
  surface: "--hb-color-surface",
  border: "--hb-color-border",
  textPrimary: "--hb-color-text-primary",
  textSecondary: "--hb-color-text-secondary",
  accent: "--hb-color-accent",
  accentContrast: "--hb-color-accent-contrast",
  danger: "--hb-color-danger",
  success: "--hb-color-success",
  successSubtle: "--hb-color-success-subtle",
  warning: "--hb-color-warning",
  warningSubtle: "--hb-color-warning-subtle",
} as const;

type Role = keyof typeof VARS;

function valuesFor({ color: c }: SemanticTokens): Record<Role, string> {
  return {
    canvas: c.bg.canvas,
    surface: c.bg.surface,
    border: c.border.default,
    textPrimary: c.text.primary,
    textSecondary: c.text.secondary,
    accent: c.brand.main,
    accentContrast: c.brand.contrast,
    danger: c.danger.main,
    success: c.success.main,
    successSubtle: c.success.subtle,
    warning: c.warning.main,
    warningSubtle: c.warning.subtle,
  };
}

const roles = Object.keys(VARS) as Role[];

function declarations(values: Record<Role, string>): string {
  return roles.map((r) => `${VARS[r]}:${values[r]};`).join("");
}

/**
 * Global stylesheet defining the `--hb-*` color vars; flips on the scheme attr.
 *
 * Reference these from StyleX styles and consumer styles as literal
 * `var(--hb-color-*)` strings (StyleX only inlines literals, not imported
 * objects, so there is intentionally no exported token map).
 */
export const colorSchemeCss =
  `:root{${declarations(valuesFor(semantic.light))}}` +
  `[${SCHEME_ATTR}="dark"]{${declarations(valuesFor(semantic.dark))}}`;
