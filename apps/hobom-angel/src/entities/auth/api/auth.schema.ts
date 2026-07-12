import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawSignUpResponse } from "./auth.type";

/** `POST /auth/signup` response schema — validates the wire contract at the boundary. */
export const signUpResponseSchema: Schema<RawSignUpResponse> = HoBomSchema.object({
  userId: HoBomSchema.string(),
  nickname: HoBomSchema.string(),
  tokens: HoBomSchema.object({
    accessToken: HoBomSchema.string(),
    refreshToken: HoBomSchema.string(),
  }),
});
