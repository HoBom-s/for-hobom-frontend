/**
 * Primitive tokens — raw atomic values, independent of color scheme.
 *
 * These carry no meaning. The "role" of a color is assigned only in the
 * semantic layer; components never reference primitives directly.
 *
 * Source of values: the existing `theme.ts` (as of 2026-07). To guarantee
 * "zero pixel change", values here must not be altered arbitrarily. Filling
 * in intermediate scale steps is allowed only as additive, no-visual-change
 * additions.
 */
export const primitives = {
  color: {
    /** brand (blue) ramp. 500 is the base color. */
    brand: {
      300: "#94baff",
      400: "#5b93ff",
      500: "#4680ff",
      600: "#3a6de0",
      700: "#2a5bd7",
    },
    green: {
      400: "#34c793",
      500: "#2ca87f",
      bgLight: "#e8f5e9",
      bgDark: "#1a3a2a",
    },
    amber: {
      400: "#f5a623",
      500: "#e58a00",
      bgLight: "#fff3e0",
      bgDark: "#3a2d1a",
    },
    red: {
      500: "#ef4444",
      600: "#dc2626",
    },
    /** secondary family. */
    indigo: {
      300: "#8a9bc8",
      400: "#5b6a98",
    },
    /** light-scheme neutral ramp (warm slate). */
    neutralWarm: {
      50: "#f0f2f5",
      200: "#d0d5dd",
      500: "#4a5568",
      700: "#2d3748",
    },
    /** dark-scheme neutral ramp (cool slate). */
    slate: {
      200: "#e2e8f0",
      400: "#94a3b8",
      700: "#334155",
      800: "#1e293b",
      900: "#111827",
    },
    white: "#ffffff",
    /** side Drawer background (fixed, scheme-independent). */
    sidebar: "#1d2630",
  },

  radius: {
    sm: 6,
    md: 8,
  },

  fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  fontSize: {
    xs: "0.75rem",
    sm: "0.8125rem",
    base: "0.875rem",
    md: "1rem",
  },
  fontWeight: {
    medium: 500,
    semibold: 600,
  },

  /** 8px grid. Matches the current MUI default spacing values. */
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
  },

  shadow: {
    appbar: "0 1px 0 rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
    drawer: "2px 0 8px rgba(0,0,0,0.15)",
    elevation1: "0 1px 4px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.03)",
    elevation2: "0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
    /** primary button hover glow. */
    brandGlow: "0 4px 12px rgba(70, 128, 255, 0.35)",
  },

  layout: {
    drawerWidth: 240,
    drawerWidthCollapsed: 64,
    appbarHeight: 56,
  },
} as const;

export type Primitives = typeof primitives;
