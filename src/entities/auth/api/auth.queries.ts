import { queryOptions } from "@tanstack/react-query";
import { fetchUsers } from "@/entities/auth/api/auth-login.api.ts";

export const fetchUserQueryOptions = () =>
  queryOptions({
    queryKey: ["hobom", "users"],
    queryFn: () => fetchUsers(),
  });
