import { Fragment, type ReactElement } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetCTAProvider } from "@/shared/model";
import { theme } from "@/shared/config";
import { ErrorBoundary } from "@/shared/ui";
import { OverlayProvider } from "@/shared/ui";

import "react-toastify/dist/ReactToastify.css";

const TOAST_AUTO_CLOSE_MS = 1000;
const STALE_TIME = 5 * 60 * 1000;
const GC_TIME = 10 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

interface Props {
  children: ReactElement;
}

export const AppProvider = ({ children }: Props) => {
  return (
    <Fragment>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        transition={Bounce}
        autoClose={TOAST_AUTO_CLOSE_MS}
      />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <BottomSheetCTAProvider>
              <OverlayProvider>{children}</OverlayProvider>
            </BottomSheetCTAProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </Fragment>
  );
};
