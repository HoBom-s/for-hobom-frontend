import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { DailyTodoType } from "./daily-todo.type";

/** `DailyTodoType` 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const dailyTodoSchema: Schema<DailyTodoType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  title: HoBomSchema.string(),
  date: HoBomSchema.date(),
  reaction: HoBomSchema.object({
    value: HoBomSchema.string(),
    reactionUserId: HoBomSchema.string(),
  }).nullable(),
  progress: HoBomSchema.enum(["COMPLETED", "PROGRESS"]),
  cycle: HoBomSchema.enum(["EVERYDAY", "EVERY_WEEKDAY", "EVERY_WEEKEND"]),
  owner: HoBomSchema.object({
    id: HoBomSchema.string(),
    username: HoBomSchema.string(),
    nickname: HoBomSchema.string(),
  }),
  category: HoBomSchema.object({
    id: HoBomSchema.string(),
    title: HoBomSchema.string(),
    ownerId: HoBomSchema.string(),
  }),
});

export const dailyTodoListSchema: Schema<DailyTodoType[]> = HoBomSchema.array(dailyTodoSchema);
