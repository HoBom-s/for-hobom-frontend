import { queryOptions } from "@tanstack/react-query";
import { fetchPendingUsers } from "./admin-user.api";

export const adminUserQueries = {
  all: () => ["admin-users"],

  pending: () =>
    queryOptions({
      queryKey: [...adminUserQueries.all(), "pending"],
      queryFn: fetchPendingUsers,
    }),
} as const;
