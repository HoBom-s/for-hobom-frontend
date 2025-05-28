import { Fragment } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HoBomRouter } from "@/apps/router";
import { theme } from "@/shared/style/config";

import "react-toastify/dist/ReactToastify.css";

const TOAST_AUTO_CLOSE_MS = 3000;
const queryClient = new QueryClient();

export default function App() {
  return (
    <Fragment>
      <CssBaseline />
      <ToastContainer
        style={{ maxWidth: "100vw", boxSizing: "border-box" }}
        position="bottom-center"
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        transition={Bounce}
        autoClose={TOAST_AUTO_CLOSE_MS}
      />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <HoBomRouter />
        </ThemeProvider>
      </QueryClientProvider>
    </Fragment>
  );
}
