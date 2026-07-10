import { queryOptions } from "hobom-data";
import { fetchPendingUsers } from "./admin-user.api";

export const adminUserQueries = {
  all: () => ["admin-users"],

  pending: () =>
    queryOptions({
      queryKey: [...adminUserQueries.all(), "pending"],
      queryFn: ({ signal }) => fetchPendingUsers(signal),
    }),
} as const;
