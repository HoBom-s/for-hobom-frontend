import { useContext } from "react";
import { DataLotContext } from "./context";
import type { DataLot } from "../core/data-lot";

export function useDataLot(): DataLot {
  const context = useContext(DataLotContext);

  if (!context) {
    throw new Error("useDataLot must be used within a DataLot.Provider");
  }

  return context;
}
