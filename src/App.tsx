import { AppProvider } from "@/apps/app-provider/ui";
import { HoBomRouter } from "@/shared/router/ui";

export default function App() {
  return (
    <AppProvider>
      <HoBomRouter />
    </AppProvider>
  );
}
