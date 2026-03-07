import type { WorkflowStatus, WorkflowTransition } from "./workflow.type";

export interface ProjectMemberType {
  userId: string;
  role: string;
  joinedAt: string;
}

export interface ProjectWorkflow {
  statuses: WorkflowStatus[];
  transitions: WorkflowTransition[];
}

export interface ProjectType {
  id: string;
  key: string;
  name: string;
  description?: string;
  owner: string;
  members: ProjectMemberType[];
  issueSequence: number;
  workflow: ProjectWorkflow | null;
}

export interface CreateProjectRequest {
  key: string;
  name: string;
  description?: string;
}

export interface UpdateProjectRequest {
  name: string;
  description?: string;
}
