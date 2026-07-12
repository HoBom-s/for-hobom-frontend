import { Hb, ColorSchemeVars, ErrorBoundary } from "hobom-design-system";
import { AngelThemeVars, ErrorState } from "@/shared/ui";
import { reportError } from "@/shared/lib";
import { AppProvider, AppRouter } from "@/apps/ui";

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
      </Hb.ColorSchemeProvider>
    </AppProvider>
  );
}
