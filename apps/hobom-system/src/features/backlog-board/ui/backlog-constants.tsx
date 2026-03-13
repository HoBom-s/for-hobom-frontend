import type { SprintStatus } from "@/entities/sprint";

export const STATUS_COLOR: Record<SprintStatus, string> = {
  PLANNING: "#9ca3af",
  ACTIVE: "#4680ff",
  COMPLETED: "#2ca87f",
};
