import { primitives as p } from "./primitives";

/**
 * Semantic tokens — the "role" of each color/value. Components reference only
 * this layer.
 *
 * light and dark each point at different primitives. Each intent keeps the full
 * main/light/dark/contrast shape so components can derive hover/active shades
 * and readable contrast colors from a single token.
 */
export interface SemanticIntent {
  main: string;
  light: string;
  dark: string;
  contrast: string;
}

export interface SemanticStatus {
  main: string;
  /** subtle background (chips/badges, etc.). */
  subtle: string;
}

export interface SemanticTokens {
  color: {
    brand: SemanticIntent;
    /** secondary. */
    neutral: { main: string; contrast: string };
    success: SemanticStatus;
    warning: SemanticStatus;
    danger: { main: string };
    bg: { canvas: string; surface: string; sidebar: string };
    text: { primary: string; secondary: string; disabled: string; onAccent: string };
    border: { default: string };
  };
}

const light: SemanticTokens = {
  color: {
    brand: {
      main: p.color.neutral[800],
      light: p.color.neutral[600],
      dark: p.color.neutral[950],
      contrast: p.color.white,
    },
    neutral: { main: p.color.neutral[500], contrast: p.color.white },
    success: { main: p.color.success.light, subtle: p.color.success.subtleLight },
    warning: { main: p.color.warning.light, subtle: p.color.warning.subtleLight },
    danger: { main: p.color.danger.light },
    bg: {
      canvas: p.color.neutral[95],
      surface: p.color.white,
      sidebar: p.color.sidebar,
    },
    text: {
      primary: p.color.neutral[900],
      secondary: p.color.neutral[500],
      disabled: p.color.neutral[400],
      onAccent: p.color.white,
    },
    border: { default: p.color.neutral[150] },
  },
};

const dark: SemanticTokens = {
  color: {
    brand: {
      main: p.color.neutral[150],
      light: p.color.neutral[300],
      dark: p.color.neutral[50],
      contrast: p.color.neutral[900],
    },
    neutral: { main: p.color.neutral[400], contrast: p.color.neutral[900] },
    success: { main: p.color.success.dark, subtle: p.color.success.subtleDark },
    warning: { main: p.color.warning.dark, subtle: p.color.warning.subtleDark },
    danger: { main: p.color.danger.dark },
    bg: {
      canvas: p.color.neutral[850],
      surface: p.color.neutral[800],
      sidebar: p.color.sidebar,
    },
    text: {
      primary: p.color.neutral[50],
      secondary: p.color.neutral[400],
      disabled: p.color.neutral[600],
      onAccent: p.color.neutral[900],
    },
    border: { default: p.color.overlayTint.dark },
  },
};

export const semantic = { light, dark } as const;

export type ColorScheme = keyof typeof semantic;
