import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // mobile
      sm: 600, // tablet portrait
      md: 900, // tablet landscape
      lg: 1200, // desktop
      xl: 1536, // large screen
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h6: {
      fontSize: "1.125rem",
    },
    body1: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
    },
  },
});
