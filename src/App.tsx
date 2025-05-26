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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        transition={Bounce}
        autoClose={TOAST_AUTO_CLOSE_MS}
      />
      <QueryClientProvider client={queryClient}>
        <HoBomRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
