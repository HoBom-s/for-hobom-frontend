import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawApplicationDetail, RawApplicationsPage } from "./application.type";

const STATUS = ["PENDING", "APPROVED", "REJECTED", "WITHDRAWN", "RETURNED"] as const;

const summaryShape = {
  id: HoBomSchema.string(),
  animalId: HoBomSchema.string(),
  shelterId: HoBomSchema.string(),
  applicantId: HoBomSchema.string(),
  status: HoBomSchema.enum(STATUS),
  questionnaireVersion: HoBomSchema.number(),
  plannedEndDate: HoBomSchema.string().nullable().optional(),
  createdAt: HoBomSchema.string().nullable(),
};

/** `GET /shelters/:id/{adoption|foster}-applications` — a cursor page. */
export const applicationsPageSchema: Schema<RawApplicationsPage> = HoBomSchema.object({
  items: HoBomSchema.array(HoBomSchema.object(summaryShape)),
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});

/** `GET /{adoption|foster}-applications/:id` — the summary plus answers. */
export const applicationDetailSchema: Schema<RawApplicationDetail> = HoBomSchema.object({
  ...summaryShape,
  answers: HoBomSchema.array(
    HoBomSchema.object({
      questionId: HoBomSchema.string(),
      values: HoBomSchema.array(HoBomSchema.string()),
    }),
  ),
});
