import type { SprintStatus } from "../model/sprint.model";

export interface SprintType {
  id: string;
  project: string;
  name: string;
  goal?: string;
  status: SprintStatus;
  startDate: string;
  endDate: string;
  completedAt?: string;
  createdBy: string;
}

export interface CreateSprintRequest {
  name: string;
  goal?: string;
  startDate: string;
  endDate: string;
}

export interface UpdateSprintRequest {
  name?: string;
  goal?: string;
  startDate?: string;
  endDate?: string;
}
