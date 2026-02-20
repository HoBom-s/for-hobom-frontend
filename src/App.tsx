import { AppProvider, AppRouter } from "@/apps/ui";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
