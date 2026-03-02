import type { IssueType, IssueStatus } from "@/entities/issue";

export type ColumnMap = Record<IssueStatus, IssueType[]>;

const COLUMN_PREFIX = "column-";

export const findColumnOfIssue = (
  columns: ColumnMap,
  issueId: string,
): IssueStatus | null => {
  for (const [status, issues] of Object.entries(columns)) {
    if (issues.some((i) => i.id.value === issueId)) {
      return status as IssueStatus;
    }
  }
  return null;
};

export const resolveDropTarget = (
  columns: ColumnMap,
  overId: string,
): IssueStatus | null => {
  if (overId.startsWith(COLUMN_PREFIX)) {
    return overId.slice(COLUMN_PREFIX.length) as IssueStatus;
  }
  return findColumnOfIssue(columns, overId);
};

export const columnDroppableId = (status: IssueStatus) =>
  `${COLUMN_PREFIX}${status}`;
