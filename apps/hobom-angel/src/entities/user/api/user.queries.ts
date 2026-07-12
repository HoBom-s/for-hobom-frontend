import { queryOptions } from "hobom-data";
import { getMe } from "./user.api";

export const userQueries = {
  all: () => ["user"] as const,

  me: () =>
    queryOptions({
      queryKey: [...userQueries.all(), "me"] as const,
      queryFn: getMe,
      // A 401 means "not signed in" — a definitive answer, so don't retry it,
      // and don't re-probe /me on every window focus/reconnect (which, paired
      // with the refresh-on-401 middleware, hammered the server).
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // Cache the session so navigation doesn't re-probe /me; login/signup
      // invalidate it explicitly to reflect a just-established session.
      staleTime: 5 * 60 * 1000,
    }),
} as const;
