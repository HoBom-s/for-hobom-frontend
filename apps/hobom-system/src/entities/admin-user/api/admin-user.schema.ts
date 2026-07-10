import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { PendingUserType } from "./admin-user.type";

export const pendingUserSchema: Schema<PendingUserType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  username: HoBomSchema.string(),
  nickname: HoBomSchema.string(),
  email: HoBomSchema.string(),
});

export const pendingUsersSchema: Schema<PendingUserType[]> = HoBomSchema.array(pendingUserSchema);
