import { z } from "zod";

export const SprintStatusModel = z.enum(["PLANNING", "ACTIVE", "COMPLETED"]);
export type SprintStatus = z.infer<typeof SprintStatusModel>;

export const SPRINT_STATUS_LABEL: Record<SprintStatus, string> = {
  PLANNING: "계획 중",
  ACTIVE: "진행 중",
  COMPLETED: "완료됨",
};
