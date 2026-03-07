import type { IssueType } from "@/entities/issue";

export type ColumnMap = Record<string, IssueType[]>;

const COLUMN_PREFIX = "column-";

export const findColumnOfIssue = (
  columns: ColumnMap,
  issueId: string,
): string | null => {
  for (const [status, issues] of Object.entries(columns)) {
    if (issues.some((i) => i.id === issueId)) {
      return status;
    }
  }
  return null;
};

export const resolveDropTarget = (
  columns: ColumnMap,
  overId: string,
): string | null => {
  if (overId.startsWith(COLUMN_PREFIX)) {
    return overId.slice(COLUMN_PREFIX.length);
  }
  return findColumnOfIssue(columns, overId);
};

export const columnDroppableId = (statusId: string) =>
  `${COLUMN_PREFIX}${statusId}`;
