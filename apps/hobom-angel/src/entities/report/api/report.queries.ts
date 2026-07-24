import { queryOptions } from "hobom-data";
import { getPendingReports } from "./report.api";

export const reportQueries = {
  all: () => ["reports"] as const,

  pending: () =>
    queryOptions({
      queryKey: [...reportQueries.all(), "pending"] as const,
      queryFn: ({ signal }) => getPendingReports(50, signal),
    }),
} as const;
