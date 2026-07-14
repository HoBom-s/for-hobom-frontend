import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { Questionnaire } from "../model/questionnaire.model";

/** `GET /shelters/:id/questionnaires/:purpose` schema — validates the contract. */
export const questionnaireSchema: Schema<Questionnaire> = HoBomSchema.object({
  id: HoBomSchema.string(),
  shelterId: HoBomSchema.string(),
  purpose: HoBomSchema.enum(["ADOPTION", "FOSTER"]),
  version: HoBomSchema.number(),
  questions: HoBomSchema.array(
    HoBomSchema.object({
      id: HoBomSchema.string(),
      prompt: HoBomSchema.string(),
      type: HoBomSchema.enum(["TEXT", "BOOLEAN", "SINGLE_CHOICE", "MULTI_CHOICE"]),
      options: HoBomSchema.array(HoBomSchema.string()),
      required: HoBomSchema.boolean(),
    }),
  ),
});
