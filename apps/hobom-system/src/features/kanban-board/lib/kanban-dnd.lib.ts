import type { IssueType } from "@/entities/issue";

/** 칸반 보드 컬럼 맵. key는 status ID, value는 해당 상태의 이슈 배열. */
export type ColumnMap = Record<string, IssueType[]>;

const COLUMN_PREFIX = "column-";

export const findColumnOfIssue = (columns: ColumnMap, issueId: string): string | null => {
  for (const [status, issues] of Object.entries(columns)) {
    if (issues.some((i) => i.id === issueId)) {
      return status;
    }
  }

  return null;
};

/**
 * DnD drop 대상의 status ID를 결정한다.
 * `overId`가 `"column-"` 접두어로 시작하면 컬럼 자체에 drop한 것,
 * 아니면 이슈 위에 drop한 것으로 판단하여 해당 이슈가 속한 컬럼을 찾는다.
 */
export const resolveDropTarget = (columns: ColumnMap, overId: string): string | null => {
  if (overId.startsWith(COLUMN_PREFIX)) {
    return overId.slice(COLUMN_PREFIX.length);
  }

  return findColumnOfIssue(columns, overId);
};

/** status ID에 `"column-"` 접두어를 붙여 droppable ID를 생성한다. */
export const columnDroppableId = (statusId: string) => `${COLUMN_PREFIX}${statusId}`;
