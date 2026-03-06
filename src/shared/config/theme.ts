import { createTheme } from "@mui/material";

export const DRAWER_WIDTH = 240;
export const APPBAR_HEIGHT = 56;

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4680ff",
      light: "#94baff",
      dark: "#2a5bd7",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#5b6a98",
      contrastText: "#ffffff",
    },
    success: {
      main: "#2ca87f",
      light: "#e8f5e9",
    },
    warning: {
      main: "#e58a00",
      light: "#fff3e0",
    },
    error: {
      main: "#dc2626",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3748",
      secondary: "#4a5568",
    },
    divider: "#d0d5dd",
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
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
      fontWeight: 500,
    },
    caption: {
      fontSize: "0.75rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#2d3748",
          boxShadow: "0 1px 0 rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#1d2630",
          border: "none",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 4,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 16,
          color: "rgba(255, 255, 255, 0.65)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            color: "rgba(255, 255, 255, 0.9)",
          },
          "&.Mui-selected": {
            backgroundColor: "#4680ff",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#3a6de0",
            },
          },
        },
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
          boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.03)",
        },
        elevation2: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(70, 128, 255, 0.35)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.875rem",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #d0d5dd",
        },
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
          borderRadius: 8,
        },
      },
    },
  },
});
