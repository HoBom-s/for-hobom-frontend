import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { IssueType } from "./issue.type";

/** `IssueType` 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const issueSchema: Schema<IssueType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  project: HoBomSchema.string(),
  issueNumber: HoBomSchema.number(),
  issueKey: HoBomSchema.string(),
  type: HoBomSchema.enum(["EPIC", "STORY", "TASK", "BUG", "SUBTASK"]),
  title: HoBomSchema.string(),
  description: HoBomSchema.string().optional(),
  status: HoBomSchema.string(),
  priority: HoBomSchema.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]),
  resolution: HoBomSchema.string().optional(),
  reporter: HoBomSchema.string(),
  assignee: HoBomSchema.string().optional(),
  sprint: HoBomSchema.string().optional(),
  parent: HoBomSchema.string().optional(),
  labels: HoBomSchema.array(HoBomSchema.string()),
  storyPoints: HoBomSchema.number().optional(),
  dueDate: HoBomSchema.date().optional(),
  resolvedAt: HoBomSchema.date().optional(),
});

export const issuesSchema: Schema<IssueType[]> = HoBomSchema.array(issueSchema);
