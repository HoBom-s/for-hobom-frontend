import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { ProjectMemberType, ProjectWorkflow, ProjectType } from "./project.type";
import type { WorkflowStatus, WorkflowTransition } from "./workflow.type";

const workflowStatusSchema: Schema<WorkflowStatus> = HoBomSchema.object({
  id: HoBomSchema.string(),
  name: HoBomSchema.string(),
  isDone: HoBomSchema.boolean(),
  order: HoBomSchema.number(),
});

const workflowTransitionSchema: Schema<WorkflowTransition> = HoBomSchema.object({
  from: HoBomSchema.string(),
  to: HoBomSchema.string(),
  name: HoBomSchema.string(),
});

const projectWorkflowSchema: Schema<ProjectWorkflow> = HoBomSchema.object({
  statuses: HoBomSchema.array(workflowStatusSchema),
  transitions: HoBomSchema.array(workflowTransitionSchema),
});

const projectMemberSchema: Schema<ProjectMemberType> = HoBomSchema.object({
  userId: HoBomSchema.string(),
  role: HoBomSchema.string(),
  joinedAt: HoBomSchema.date(),
});

/** `ProjectType` 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const projectSchema: Schema<ProjectType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  key: HoBomSchema.string(),
  name: HoBomSchema.string(),
  description: HoBomSchema.string().optional(),
  owner: HoBomSchema.string(),
  members: HoBomSchema.array(projectMemberSchema),
  issueSequence: HoBomSchema.number(),
  workflow: projectWorkflowSchema.nullable(),
});

export const projectsSchema: Schema<ProjectType[]> = HoBomSchema.array(projectSchema);
