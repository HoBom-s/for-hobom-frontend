import { HoBomSchema, type Infer } from "hobom-schema";

export const SprintStatusModel = HoBomSchema.enum(["PLANNING", "ACTIVE", "COMPLETED"]);
export type SprintStatus = Infer<typeof SprintStatusModel>;

export const SPRINT_STATUS_LABEL: Record<SprintStatus, string> = {
  PLANNING: "계획 중",
  ACTIVE: "진행 중",
  COMPLETED: "완료됨",
};
