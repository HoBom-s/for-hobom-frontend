import { createTheme } from "@mui/material";

export const DRAWER_WIDTH = 240;

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.8125rem",
    },
    button: {
      textTransform: "none",
      fontSize: "0.875rem",
    },
    caption: {
      fontSize: "0.75rem",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#1a1a1a",
          boxShadow: "0 1px 0 rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(0, 0, 0, 0.08)",
          backgroundColor: "#fafafa",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          marginBottom: 2,
          paddingTop: 7,
          paddingBottom: 7,
          "&.Mui-selected": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.12)",
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 36,
        },
      },
    },
  },
});
