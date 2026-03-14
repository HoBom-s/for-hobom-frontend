import type { ReactNode } from "react";
import { DataLot, DataLotProvider } from "hobom-data";

export const createTestDataLot = () =>
  new DataLot({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

export const createWrapper = (dataLot?: DataLot) => {
  const client = dataLot ?? createTestDataLot();

  return ({ children }: { children: ReactNode }) => (
    <DataLotProvider client={client}>{children}</DataLotProvider>
  );
};
