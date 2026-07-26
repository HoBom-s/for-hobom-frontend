import { useQuery } from "hobom-data";
import { userQueries } from "../api/user.queries";

/**
 * The current session: who is signed in (via `GET /users/me`), if anyone. Backed
 * by a cached query, so it survives reloads as long as the session cookie does.
 */
export const useCurrentUser = () => {
  const { data, isSuccess, status } = useQuery(userQueries.me());

  // Gate on the "pending" status, not `isLoading` — on the very first render the
  // fetch hasn't started yet (fetchStatus is still "idle"), so `isLoading` is
  // false even though the session is undetermined. Treating that frame as
  // "guest" bounces a reload on a protected route to /login and then home.
  // `pending` stays true until the probe settles, and is off for refetches.
  return { user: data, isAuthenticated: isSuccess, isLoading: status === "pending" };
};
