import { Hb, ColorSchemeVars, ErrorBoundary } from "hobom-design-system";
import { Slide, ToastContainer } from "react-toastify";
import { AngelThemeVars, ErrorState } from "@/shared/ui";
import { reportError } from "@/shared/lib";
import { AppProvider, AppRouter } from "@/apps/ui";

import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

export default function App() {
  return (
    <AppProvider>
      <Hb.ColorSchemeProvider>
        {/* Neutral core tokens, then the Angel green theme on top. */}
        <ColorSchemeVars />
        <AngelThemeVars />
        <ErrorBoundary
          fallback={<ErrorState />}
          onError={(error, info) => reportError(error, { componentStack: info.componentStack })}
        >
          <AppRouter />
        </ErrorBoundary>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          transition={Slide}
        />
      </Hb.ColorSchemeProvider>
    </AppProvider>
  );
}
