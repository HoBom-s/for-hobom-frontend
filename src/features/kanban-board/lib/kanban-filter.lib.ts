import {
  isDescendantOf,
  getRootEpic,
  getDescendantProgress,
  type IssueType,
  type IssueTreeResult,
  type DescendantProgress,
} from "@/entities/issue";
import type { ColumnMap } from "./kanban-dnd.lib";

export interface SwimlaneGroup {
  epicId: string | null;
  epicKey: string | null;
  epicTitle: string;
  progress?: DescendantProgress;
}

export const filterColumnsByEpic = (
  columns: ColumnMap,
  epicId: string,
  parentMap: Map<string, IssueType>,
): ColumnMap => {
  const filtered: ColumnMap = {};
  for (const [status, issues] of Object.entries(columns)) {
    filtered[status] = issues.filter(
      (issue) =>
        issue.id === epicId || isDescendantOf(issue.id, epicId, parentMap),
    );
  }
  return filtered;
};

export const buildSwimlaneGroups = (
  issues: IssueType[],
  issueTree: IssueTreeResult,
  doneStatusIds: Set<string>,
): SwimlaneGroup[] => {
  const epicMap = new Map<string | null, SwimlaneGroup>();

  for (const issue of issues) {
    const rootEpic = getRootEpic(issue.id, issueTree.parentMap);
    const epicId = rootEpic?.id ?? (issue.type === "EPIC" ? issue.id : null);

    if (!epicMap.has(epicId)) {
      if (epicId) {
        const epic = issues.find((i) => i.id === epicId);
        epicMap.set(epicId, {
          epicId,
          epicKey: epic?.issueKey ?? null,
          epicTitle: epic?.title ?? "",
          progress: getDescendantProgress(
            epicId,
            issueTree.childrenMap,
            doneStatusIds,
          ),
        });
      } else {
        epicMap.set(null, {
          epicId: null,
          epicKey: null,
          epicTitle: "에픽 없음",
        });
      }
    }
  }

  return [...epicMap.values()].sort((a, b) => {
    if (a.epicId === null) return 1;
    if (b.epicId === null) return -1;
    return (a.epicKey ?? "").localeCompare(b.epicKey ?? "");
  });
};
