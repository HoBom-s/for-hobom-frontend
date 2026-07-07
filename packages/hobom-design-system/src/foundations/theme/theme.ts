import { createTheme, type PaletteOptions } from "@mui/material";
import { primitives, semantic } from "../tokens";
import type { SemanticTokens } from "../tokens";

/** Side Drawer expanded width (px). Must stay in sync with AppShell. */
export const DRAWER_WIDTH = primitives.layout.drawerWidth;
/** Side Drawer collapsed width (px). */
export const DRAWER_WIDTH_COLLAPSED = primitives.layout.drawerWidthCollapsed;
/** Top AppBar height (px). Used as the main content offset. */
export const APPBAR_HEIGHT = primitives.layout.appbarHeight;

/** Map a semantic token set to an MUI palette (1:1, lossless). */
const toPalette = ({ color: c }: SemanticTokens): PaletteOptions => ({
  primary: {
    main: c.brand.main,
    light: c.brand.light,
    dark: c.brand.dark,
    contrastText: c.brand.contrast,
  },
  secondary: { main: c.neutral.main, contrastText: c.neutral.contrast },
  success: { main: c.success.main, light: c.success.subtle },
  warning: { main: c.warning.main, light: c.warning.subtle },
  error: { main: c.danger.main },
  background: { default: c.bg.canvas, paper: c.bg.surface },
  text: { primary: c.text.primary, secondary: c.text.secondary },
  divider: c.border.default,
});

/**
 * MUI theme. Switches light/dark via the `data-mui-color-scheme` attribute.
 *
 * All colors, typography, radii and shadows are sourced from the token layer
 * (`./tokens`) rather than hardcoded here. MUI is the only consumer of these
 * tokens today; this file is the single point that will be removed once
 * components no longer depend on MUI.
 */
export const theme = createTheme({
  cssVariables: { colorSchemeSelector: "data-mui-color-scheme" },
  colorSchemes: {
    light: { palette: toPalette(semantic.light) },
    dark: { palette: toPalette(semantic.dark) },
  },
  typography: {
    fontFamily: primitives.fontFamily,
    h6: {
      fontSize: primitives.fontSize.md,
      fontWeight: primitives.fontWeight.semibold,
    },
    body1: {
      fontSize: primitives.fontSize.base,
    },
    body2: {
      fontSize: primitives.fontSize.sm,
    },
    button: {
      textTransform: "none",
      fontSize: primitives.fontSize.base,
      fontWeight: primitives.fontWeight.medium,
    },
    caption: {
      fontSize: primitives.fontSize.xs,
    },
  },
  shape: {
    borderRadius: primitives.radius.md,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        // Light: the chrome sits on the canvas tint so the main content reads
        // as a bright surface framed by it. Dark: the canvas is darker than the
        // surface, which makes the bar read as a mismatched dark strip, so the
        // chrome uses the surface tone and blends with the content instead.
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.background.default,
          color: theme.vars.palette.text.primary,
          boxShadow: primitives.shadow.appbar,
          ...theme.applyStyles("dark", {
            backgroundColor: theme.vars.palette.background.paper,
          }),
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: theme.vars.palette.background.default,
          borderRight: `1px solid ${theme.vars.palette.divider}`,
          boxShadow: "none",
          ...theme.applyStyles("dark", {
            backgroundColor: theme.vars.palette.background.paper,
          }),
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: primitives.radius.md,
          marginBottom: 4,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 16,
          color: theme.vars.palette.text.secondary,
          "&:hover": {
            backgroundColor: theme.vars.palette.action.hover,
            color: theme.vars.palette.text.primary,
          },
          "&.Mui-selected": {
            backgroundColor: theme.vars.palette.action.selected,
            color: theme.vars.palette.text.primary,
            "&:hover": {
              backgroundColor: theme.vars.palette.action.selected,
            },
          },
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 36,
          color: "inherit",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: primitives.shadow.elevation1,
        },
        elevation2: {
          boxShadow: primitives.shadow.elevation2,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: primitives.radius.md,
          fontWeight: primitives.fontWeight.medium,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: primitives.shadow.brandGlow,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: primitives.radius.sm,
          fontWeight: primitives.fontWeight.medium,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: primitives.fontWeight.medium,
          fontSize: primitives.fontSize.base,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottom: `1px solid ${theme.vars.palette.divider}`,
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: primitives.radius.md,
        },
      },
    },
  },
});
