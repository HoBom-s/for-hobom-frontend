import { httpClient, parseResponse } from "@/shared/api";
import { toCurrentUser } from "../lib/to-current-user.lib";
import { myProfileSchema } from "./user.schema";
import type { CurrentUser } from "./user.type";

const parseMe = parseResponse(myProfileSchema, "GET /users/me");

/** Fetch the signed-in account. Rejects with a 401 when there is no session. */
export const getMe = (): Promise<CurrentUser> =>
  httpClient.get("/users/me").then(parseMe).then(toCurrentUser);

/** Change the signed-in account's nickname (requires auth, no response body). */
export const changeNickname = (nickname: string): Promise<void> =>
  httpClient.patch("/users/me/nickname", { nickname }).then(() => undefined);

/** Withdraw (delete) the signed-in account (requires auth, no response body). */
export const withdrawAccount = (): Promise<void> =>
  httpClient.post("/users/me/withdrawal", {}).then(() => undefined);
