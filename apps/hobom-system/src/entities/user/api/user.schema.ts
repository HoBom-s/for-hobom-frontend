import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { UserType } from "./user.type";

export const userSchema: Schema<UserType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  username: HoBomSchema.string(),
  nickname: HoBomSchema.string(),
  email: HoBomSchema.string(),
  friends: HoBomSchema.array(HoBomSchema.string()),
});

export const usersSchema: Schema<UserType[]> = HoBomSchema.array(userSchema);
