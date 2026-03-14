import { useMemo } from "react";
import { useSuspenseQuery } from "hobom-data";
import { Bom } from "hobom-utils";
import { issueQueries, buildIssueTree, type IssueType } from "@/entities/issue";
import type { ColumnMap } from "../lib/kanban-dnd.lib";

export const useKanbanBoard = (projectId: string, columnOrder: string[]) => {
  const { data } = useSuspenseQuery(issueQueries.listByProject(projectId));

  const groupedByStatus = useMemo(() => {
    const grouped = Bom.pipe(
      data.items,
      Bom.groupBy((issue: IssueType) => issue.status),
    );

    return Object.fromEntries(columnOrder.map((s) => [s, grouped[s] ?? []])) as ColumnMap;
  }, [data.items, columnOrder]);

  const issueTree = useMemo(() => buildIssueTree(data.items), [data.items]);

  return { groupedByStatus, issueTree };
};
