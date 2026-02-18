import { AppProvider } from "@/apps/app-provider/ui";
import { AppRouter } from "@/apps/app-router";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
