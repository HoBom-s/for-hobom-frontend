import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { SubmitFosterResult } from "./foster.type";

export const submitFosterSchema: Schema<SubmitFosterResult> = HoBomSchema.object({
  fosterApplicationId: HoBomSchema.string(),
  approvalId: HoBomSchema.string(),
});
