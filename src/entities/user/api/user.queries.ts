import { queryOptions } from "@tanstack/react-query";
import { fetchMe, fetchUsers, fetchUserById } from "./user.api";

export const userQueries = {
  users: () => queryOptions({ queryKey: ["users"] }),
  me: () =>
    queryOptions({
      queryKey: [...userQueries.users().queryKey, "me"],
      queryFn: fetchMe,
      staleTime: Infinity,
    }),
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
