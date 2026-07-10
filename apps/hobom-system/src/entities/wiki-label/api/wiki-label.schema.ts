import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { LabelType, LabelPageType } from "./wiki-label.type";

export const labelSchema: Schema<LabelType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  spaceId: HoBomSchema.string(),
  name: HoBomSchema.string(),
  color: HoBomSchema.string(),
  createdAt: HoBomSchema.date(),
});

export const labelsSchema: Schema<LabelType[]> = HoBomSchema.array(labelSchema);

export const labelPageSchema: Schema<LabelPageType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  spaceId: HoBomSchema.string(),
  title: HoBomSchema.string(),
  updatedAt: HoBomSchema.date(),
});

export const labelPagesSchema: Schema<LabelPageType[]> = HoBomSchema.array(labelPageSchema);
