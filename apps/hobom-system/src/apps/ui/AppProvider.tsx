import { Fragment, type ReactElement } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { DataLot, DataLotProvider } from "hobom-data";
import { BottomSheetCTAProvider } from "@/shared/model";
import { GLOBAL_STYLES } from "@/shared/config";
import { Hb, ErrorBoundary, OverlayProvider, ColorSchemeVars } from "@/shared/ui";
import { reportError } from "@/shared/lib";
import { ColorSchemeBridge } from "./ColorSchemeBridge";
import { renderToastIcon } from "./toast-icon";

import "react-toastify/dist/ReactToastify.css";

const STALE_TIME = 5 * 60 * 1000;
const GC_TIME = 10 * 60 * 1000;
const TOAST_AUTO_CLOSE_MS = 2500;

const dataLot = new DataLot({
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
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        transition={Slide}
        autoClose={TOAST_AUTO_CLOSE_MS}
        icon={renderToastIcon}
        closeButton={false}
      />
      <DataLotProvider client={dataLot}>
        <Hb.ColorSchemeProvider>
          <Hb.CssBaseline enableColorScheme />
          <Hb.GlobalStyles styles={GLOBAL_STYLES} />
          <ColorSchemeVars />
          <ColorSchemeBridge />
          <ErrorBoundary
            onError={(err, info) => reportError(err, { componentStack: info.componentStack })}
          >
            <BottomSheetCTAProvider>
              <OverlayProvider>{children}</OverlayProvider>
            </BottomSheetCTAProvider>
          </ErrorBoundary>
        </Hb.ColorSchemeProvider>
      </DataLotProvider>
    </Fragment>
  );
};
