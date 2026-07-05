import * as stylex from "@stylexjs/stylex";

/**
 * Scheme-dependent semantic color tokens.
 *
 * `scheme` holds the light values (the default). `darkTheme` is a StyleX theme
 * class that overrides them with the dark values; apply it to an ancestor
 * (e.g. `<html>`) to flip every component underneath. Values mirror the
 * light/dark maps in `./semantic`.
 */
export const scheme = stylex.defineVars({
  canvas: "#f0f2f5",
  surface: "#ffffff",
  textPrimary: "#2d3748",
  textSecondary: "#4a5568",
  border: "#d0d5dd",
  accent: "#4680ff",
});

export const darkTheme = stylex.createTheme(scheme, {
  canvas: "#111827",
  surface: "#1e293b",
  textPrimary: "#e2e8f0",
  textSecondary: "#94a3b8",
  border: "#334155",
  accent: "#5b93ff",
});
