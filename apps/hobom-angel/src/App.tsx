import { AngelBrandVars } from "hobom-design-system";
import { AppProvider, AppRouter } from "@/apps/ui";

export default function App() {
  return (
    <AppProvider>
      <AngelBrandVars />
      <AppRouter />
    </AppProvider>
  );
}
