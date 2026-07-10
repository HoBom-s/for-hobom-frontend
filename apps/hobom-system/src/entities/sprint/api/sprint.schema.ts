import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { SprintType } from "./sprint.type";

/** `SprintType` 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const sprintSchema: Schema<SprintType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  project: HoBomSchema.string(),
  name: HoBomSchema.string(),
  goal: HoBomSchema.string().optional(),
  status: HoBomSchema.enum(["PLANNING", "ACTIVE", "COMPLETED"]),
  startDate: HoBomSchema.date(),
  endDate: HoBomSchema.date(),
  completedAt: HoBomSchema.date().optional(),
  createdBy: HoBomSchema.string(),
});

export const sprintsSchema: Schema<SprintType[]> = HoBomSchema.array(sprintSchema);
