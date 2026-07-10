/**
 * Primitive tokens — raw atomic values, independent of color scheme.
 *
 * These carry no meaning. The "role" of a color is assigned only in the
 * semantic layer; components never reference primitives directly.
 *
 * The color palette follows Astryx's "neutral" theme: a grayscale spine
 * (Tailwind neutral) with an OKLCH-derived status set. There is no brand hue —
 * the accent is near-black in light mode and near-white in dark mode.
 */
export const primitives = {
  color: {
    /** Grayscale spine (Tailwind neutral); `95`/`150`/`850` are Astryx stops. */
    neutral: {
      0: "#ffffff",
      50: "#fafafa",
      95: "#f1f1f1",
      100: "#f5f5f5",
      150: "#ebebeb",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      850: "#1b1b1b",
      900: "#171717",
      950: "#0a0a0a",
    },
    success: {
      light: "#007004",
      dark: "#9fe59b",
      subtleLight: "#c5e5c0",
      subtleDark: "#84c9803d",
    },
    warning: {
      light: "#745b00",
      dark: "#fdcf4f",
      subtleLight: "#f8da9d",
      subtleDark: "#deb4333d",
    },
    danger: {
      light: "#a50c25",
      dark: "#ffc6c1",
    },
    /** Subtle neutral tint for borders/dividers on tinted surfaces. */
    overlayTint: {
      light: "#0000000f",
      dark: "#ffffff1a",
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

  /** 8px grid — the base spacing unit. */
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
    brandGlow: "0 4px 12px rgba(0, 0, 0, 0.18)",
  },

  layout: {
    drawerWidth: 240,
    drawerWidthCollapsed: 64,
    appbarHeight: 56,
  },
} as const;

export type Primitives = typeof primitives;
