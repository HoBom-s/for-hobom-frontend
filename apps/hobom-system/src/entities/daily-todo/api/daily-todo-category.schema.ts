import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { CategoryType } from "./daily-todo-category.type";

/** `CategoryType` 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const categorySchema: Schema<CategoryType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  title: HoBomSchema.string(),
  ownerId: HoBomSchema.string(),
});

export const categoryListSchema: Schema<CategoryType[]> = HoBomSchema.array(categorySchema);
