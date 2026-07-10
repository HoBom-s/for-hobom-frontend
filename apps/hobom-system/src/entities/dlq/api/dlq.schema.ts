import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { DlqListResponse } from "./dlq.type";

export const dlqListSchema: Schema<DlqListResponse> = HoBomSchema.object({
  items: HoBomSchema.array(HoBomSchema.string()),
});
