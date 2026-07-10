import { HoBomSchema } from "hobom-schema";
import type { PaginatedItems } from "@/shared/api";
import type { Schema } from "hobom-schema";
import type { ErrorEventDto } from "./error-event.type";

export const errorEventSchema: Schema<ErrorEventDto> = HoBomSchema.object({
  id: HoBomSchema.number(),
  message: HoBomSchema.string(),
  stackTrace: HoBomSchema.string().nullable(),
  screen: HoBomSchema.string(),
  errorType: HoBomSchema.enum(["SERVER_RESPONSE", "CLIENT_LOGIC"]),
  userAgent: HoBomSchema.string().nullable(),
  nickname: HoBomSchema.string().nullable(),
  createdAt: HoBomSchema.date(),
});

export const errorEventPageSchema: Schema<PaginatedItems<ErrorEventDto>> = HoBomSchema.object({
  items: HoBomSchema.array(errorEventSchema),
  totalCount: HoBomSchema.number(),
  offset: HoBomSchema.number(),
  limit: HoBomSchema.number(),
});
