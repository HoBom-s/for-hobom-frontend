import { queryOptions } from "hobom-data";
import { fetchUsers } from "./auth-login.api";

export const authQueries = {
  auth: () => ["auth"],

  users: () =>
    queryOptions({
      queryKey: ["auth", "users"],
      queryFn: ({ signal }) => fetchUsers(signal),
    }),
} as const;
