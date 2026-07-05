import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchMe, fetchUsers, fetchUserById } from "./user.api";

export const userQueries = {
  // Key-only namespace (no fetch); consumed solely via `.queryKey`.
  users: () => ({ queryKey: ["users"] }),
  me: () =>
    queryOptions({
      queryKey: [...userQueries.users().queryKey, "me"],
      queryFn: fetchMe,
      ...CACHE_PROFILE.STATIC,
    }),
  list: () =>
    queryOptions({
      queryKey: [...userQueries.users().queryKey, "list"],
      queryFn: fetchUsers,
      ...CACHE_PROFILE.SLOW,
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: [...userQueries.users().queryKey, id],
      queryFn: () => fetchUserById({ id }),
      ...CACHE_PROFILE.SLOW,
    }),
};
