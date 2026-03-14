import { createContext, type ReactNode } from "react";
import type { DataLot } from "../core/data-lot";

export const DataLotContext = createContext<DataLot | null>(null);

export interface DataLotProviderProps {
  client: DataLot;
  children: ReactNode;
}

export function DataLotProvider({ client, children }: DataLotProviderProps) {
  return <DataLotContext.Provider value={client}>{children}</DataLotContext.Provider>;
}
