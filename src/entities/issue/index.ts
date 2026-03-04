export {
  type IssueKind,
  type IssuePriority,
  type IssueStatusCategory,
  type IssueTransition,
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  ISSUE_STATUS_CATEGORY_LABEL,
  ISSUE_STATUS_CATEGORY_ORDER,
  STATUS_CATEGORY_TO_ID,
  getAvailableTransitions,
} from "./model/issue.model";
export {
  ISSUE_KIND_REGISTRY,
  ISSUE_PRIORITY_REGISTRY,
  ISSUE_STATUS_CATEGORY_REGISTRY,
} from "./ui/issue-registry";
export { issueQueries } from "./api/issue.queries";
export { useCreateIssue } from "./model/useCreateIssue";
export { useUpdateIssue } from "./model/useUpdateIssue";
export { useTransitionIssue } from "./model/useTransitionIssue";
export { IssueCard } from "./ui/IssueCard";

export {
  buildIssueTree,
  flattenIssueTree,
  getDescendantProgress,
  isDescendantOf,
  getRootEpic,
  PARENT_ISSUE_KINDS,
  type IssueTreeResult,
  type DescendantProgress,
} from "./lib/issue-tree.lib";

export type { IssueType } from "./api/issue.type";
