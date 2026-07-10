import { HoBomSchema } from "hobom-schema";
import type { UserType } from "../model/auth-login.type";
import type { Schema } from "hobom-schema";

export const userSchema: Schema<UserType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  username: HoBomSchema.string(),
  email: HoBomSchema.string(),
  nickname: HoBomSchema.string(),
});

export const usersSchema: Schema<UserType[]> = HoBomSchema.array(userSchema);
