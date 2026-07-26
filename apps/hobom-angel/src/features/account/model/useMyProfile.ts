import { useSuspenseQuery } from "hobom-data";
import { userQueries } from "@/entities/user";

/** The signed-in account, suspense-loaded (the session is already cached by the
 *  protected route, so this reads through instantly). */
export const useMyProfile = () => {
  const { data } = useSuspenseQuery(userQueries.me());

  return data;
};
