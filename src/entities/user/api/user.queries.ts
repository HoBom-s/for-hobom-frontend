import { queryOptions } from "@tanstack/react-query";
import { fetchUsers, fetchUserById } from "./user.api";

export const userQueries = {
  users: () => queryOptions({ queryKey: ["users"] }),
  list: () =>
    queryOptions({
      queryKey: [...userQueries.users().queryKey, "list"],
      queryFn: fetchUsers,
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: [...userQueries.users().queryKey, id],
      queryFn: () => fetchUserById({ id }),
    }),
};
