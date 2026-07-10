import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { IssueCommentType } from "./issue-comment.type";

/** `IssueCommentType` 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const issueCommentSchema: Schema<IssueCommentType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  issue: HoBomSchema.string(),
  author: HoBomSchema.string(),
  body: HoBomSchema.string(),
  editedAt: HoBomSchema.date().nullable(),
  createdAt: HoBomSchema.date(),
});

export const issueCommentsSchema: Schema<IssueCommentType[]> =
  HoBomSchema.array(issueCommentSchema);
