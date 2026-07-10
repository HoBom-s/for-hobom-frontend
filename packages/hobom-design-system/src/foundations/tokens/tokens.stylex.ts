import * as stylex from "@stylexjs/stylex";

/**
 * StyleX design-token variables — the single source of truth for StyleX-styled
 * components.
 *
 * Values mirror the primitive token objects in `./primitives` for now: while
 * some code still needs plain-JS token values, the same atoms live in both
 * places. That duplication goes away once every component is on StyleX.
 *
 * Only the tokens currently consumed are defined here; grow the set as more
 * components adopt StyleX. Scheme-dependent (light/dark) tokens are added when
 * the first scheme-aware component needs them.
 */

export const color = stylex.defineVars({
  /** Dark inverse surface for overlays that stay dark in both schemes. */
  inverseSurface: "#1e293b", // primitives.color.slate[800]
  /** Foreground on the inverse surface. */
  onInverse: "#ffffff", // primitives.color.white
});

export const radius = stylex.defineVars({
  sm: "6px", // primitives.radius.sm
  md: "8px", // primitives.radius.md
});

export const font = stylex.defineVars({
  xs: "0.75rem", // primitives.fontSize.xs
  sm: "0.8125rem", // primitives.fontSize.sm
  base: "0.875rem", // primitives.fontSize.base
});

export const shadow = stylex.defineVars({
  elevation2: "0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
});
