import { httpClient, parseResponse } from "@/shared/api";
import { toCurrentUser } from "../lib/to-current-user.lib";
import { myProfileSchema } from "./user.schema";
import type { CurrentUser } from "./user.type";

const parseMe = parseResponse(myProfileSchema, "GET /users/me");

/** Fetch the signed-in account. Rejects with a 401 when there is no session. */
export const getMe = (): Promise<CurrentUser> =>
  httpClient.get("/users/me").then(parseMe).then(toCurrentUser);
