import { primitives as p } from "./primitives";

/**
 * Semantic tokens — the "role" of each color/value. Components reference only
 * this layer.
 *
 * light and dark each point at different primitives. The shape mirrors the MUI
 * palette losslessly (main/light/dark/contrast) so that the next PR's MUI
 * bridge can rebuild `createTheme` from these values while keeping pixels
 * identical.
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
    text: { primary: string; secondary: string; onAccent: string };
    border: { default: string };
  };
}

const light: SemanticTokens = {
  color: {
    brand: {
      main: p.color.brand[500],
      light: p.color.brand[300],
      dark: p.color.brand[700],
      contrast: p.color.white,
    },
    neutral: { main: p.color.indigo[400], contrast: p.color.white },
    success: { main: p.color.green[500], subtle: p.color.green.bgLight },
    warning: { main: p.color.amber[500], subtle: p.color.amber.bgLight },
    danger: { main: p.color.red[600] },
    bg: {
      canvas: p.color.neutralWarm[50],
      surface: p.color.white,
      sidebar: p.color.sidebar,
    },
    text: {
      primary: p.color.neutralWarm[700],
      secondary: p.color.neutralWarm[500],
      onAccent: p.color.white,
    },
    border: { default: p.color.neutralWarm[200] },
  },
};

const dark: SemanticTokens = {
  color: {
    brand: {
      main: p.color.brand[400],
      light: p.color.brand[300],
      dark: p.color.brand[600],
      contrast: p.color.white,
    },
    neutral: { main: p.color.indigo[300], contrast: p.color.white },
    success: { main: p.color.green[400], subtle: p.color.green.bgDark },
    warning: { main: p.color.amber[400], subtle: p.color.amber.bgDark },
    danger: { main: p.color.red[500] },
    bg: {
      canvas: p.color.slate[900],
      surface: p.color.slate[800],
      sidebar: p.color.sidebar,
    },
    text: {
      primary: p.color.slate[200],
      secondary: p.color.slate[400],
      onAccent: p.color.white,
    },
    border: { default: p.color.slate[700] },
  },
};

export const semantic = { light, dark } as const;

export type ColorScheme = keyof typeof semantic;
