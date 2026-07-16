import type { ReactNode } from "react";
import { DataLot, DataLotProvider } from "hobom-data";
import { OverlayProvider } from "hobom-design-system";

const STALE_TIME = 5 * 60 * 1000;
const GC_TIME = 10 * 60 * 1000;

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
  children: ReactNode;
}

export const AppProvider = ({ children }: Props) => (
  <DataLotProvider client={dataLot}>
    <OverlayProvider>{children}</OverlayProvider>
  </DataLotProvider>
);
