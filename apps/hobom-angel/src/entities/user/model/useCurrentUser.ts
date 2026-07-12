import { useQuery } from "hobom-data";
import { userQueries } from "../api/user.queries";

/**
 * The current session: who is signed in (via `GET /users/me`), if anyone. Backed
 * by a cached query, so it survives reloads as long as the session cookie does.
 */
export const useCurrentUser = () => {
  const { data, isSuccess, isLoading } = useQuery(userQueries.me());

  return { user: data, isAuthenticated: isSuccess, isLoading };
};
