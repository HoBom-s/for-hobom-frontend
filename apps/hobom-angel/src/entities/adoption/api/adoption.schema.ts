import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { SubmitAdoptionResult } from "./adoption.type";

export const submitAdoptionSchema: Schema<SubmitAdoptionResult> = HoBomSchema.object({
  applicationId: HoBomSchema.string(),
  approvalId: HoBomSchema.string(),
});
