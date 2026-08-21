import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawInquiriesPage, StartInquiryResult } from "./inquiry.type";

const inquiryShape = {
  inquiryId: HoBomSchema.string(),
  shelterId: HoBomSchema.string(),
  inquirerId: HoBomSchema.string(),
  animalId: HoBomSchema.string().nullable(),
  createdAt: HoBomSchema.string().nullable(),
};

/** `GET /me/inquiries` — a cursor page of the viewer's inquiries. */
export const inquiriesPageSchema: Schema<RawInquiriesPage> = HoBomSchema.object({
  items: HoBomSchema.array(HoBomSchema.object(inquiryShape)),
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});

/** `POST /animals/:animalId/inquiries` — the new inquiry id. */
export const startInquiryResultSchema: Schema<StartInquiryResult> = HoBomSchema.object({
  inquiryId: HoBomSchema.string(),
});
