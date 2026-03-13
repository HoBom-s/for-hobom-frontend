import { queryOptions } from "@tanstack/react-query";
import { fetchUsers } from "@/entities/auth/api/auth-login.api";

export const authQueries = {
  auth: () => ["auth"],

  users: () =>
    queryOptions({
      queryKey: ["auth", "users"],
      queryFn: () => fetchUsers(),
    }),
} as const;
