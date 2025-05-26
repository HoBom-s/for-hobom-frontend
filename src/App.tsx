import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HoBomRouter } from "@/apps/router";
import { theme } from "@/shared/style/config";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <HoBomRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
