import { Bom } from "hobom-utils";
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
): ColumnMap =>
  Bom.pipe(
    columns,
    Bom.mapValues((issues: IssueType[]) =>
      issues.filter((issue) => issue.id === epicId || isDescendantOf(issue.id, epicId, parentMap)),
    ),
  );

export const buildSwimlaneGroups = (
  issues: IssueType[],
  issueTree: IssueTreeResult,
  doneStatusIds: Set<string>,
): SwimlaneGroup[] => {
  const issueMap = new Map(issues.map((i) => [i.id, i]));

  const epicEntries = Bom.pipe(
    issues,
    Bom.map((issue: IssueType) => {
      const rootEpic = getRootEpic(issue.id, issueTree.parentMap);

      return rootEpic?.id ?? (issue.type === "EPIC" ? issue.id : null);
    }),
    Bom.uniq,
    Bom.map((epicId: string | null): SwimlaneGroup => {
      if (!epicId) {
        return { epicId: null, epicKey: null, epicTitle: "에픽 없음" };
      }
      const epic = issueMap.get(epicId);

      return {
        epicId,
        epicKey: epic?.issueKey ?? null,
        epicTitle: epic?.title ?? "",
        progress: getDescendantProgress(epicId, issueTree.childrenMap, doneStatusIds),
      };
    }),
    Bom.sortBy((g: SwimlaneGroup) => {
      if (g.epicId === null) return "\uffff";

      return g.epicKey ?? "";
    }),
  );

  return epicEntries;
};
