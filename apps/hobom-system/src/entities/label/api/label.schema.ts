import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { LabelItemType } from "./label.type";

/** `LabelItemType` 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const labelItemSchema: Schema<LabelItemType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  title: HoBomSchema.string(),
  ownerId: HoBomSchema.string(),
});

export const labelItemsSchema: Schema<LabelItemType[]> = HoBomSchema.array(labelItemSchema);
