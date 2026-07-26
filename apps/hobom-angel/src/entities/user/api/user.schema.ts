import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { PublicProfile, RawMyProfile } from "./user.type";

/** `GET /users/me` response schema — validates the wire contract at the boundary. */
export const myProfileSchema: Schema<RawMyProfile> = HoBomSchema.object({
  id: HoBomSchema.string(),
  nickname: HoBomSchema.string(),
  email: HoBomSchema.string(),
  verifiedChannel: HoBomSchema.string(),
  roles: HoBomSchema.array(HoBomSchema.string()),
  shelterRoles: HoBomSchema.array(
    HoBomSchema.object({ shelterId: HoBomSchema.string(), role: HoBomSchema.string() }),
  ),
  status: HoBomSchema.string(),
});

/** `GET /users/:userId` response schema. */
export const publicProfileSchema: Schema<PublicProfile> = HoBomSchema.object({
  id: HoBomSchema.string(),
  nickname: HoBomSchema.string(),
});
