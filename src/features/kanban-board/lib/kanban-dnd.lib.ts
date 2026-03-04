import type { IssueType, IssueStatusCategory } from "@/entities/issue";

export type ColumnMap = Record<IssueStatusCategory, IssueType[]>;

const COLUMN_PREFIX = "column-";

export const findColumnOfIssue = (
  columns: ColumnMap,
  issueId: string,
): IssueStatusCategory | null => {
  for (const [status, issues] of Object.entries(columns)) {
    if (issues.some((i) => i.id === issueId)) {
      return status as IssueStatusCategory;
    }
  }
  return null;
};

export const resolveDropTarget = (
  columns: ColumnMap,
  overId: string,
): IssueStatusCategory | null => {
  if (overId.startsWith(COLUMN_PREFIX)) {
    return overId.slice(COLUMN_PREFIX.length) as IssueStatusCategory;
  }
  return findColumnOfIssue(columns, overId);
};

export const columnDroppableId = (status: IssueStatusCategory) =>
  `${COLUMN_PREFIX}${status}`;
