import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HoBomRouter } from "@/apps/router";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HoBomRouter />
    </QueryClientProvider>
  );
}
