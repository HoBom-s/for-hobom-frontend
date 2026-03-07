import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { issueQueries, buildIssueTree, type IssueType } from "@/entities/issue";
import type { ColumnMap } from "../lib/kanban-dnd.lib";

export const useKanbanBoard = (projectId: string, columnOrder: string[]) => {
  const { data } = useSuspenseQuery(issueQueries.listByProject(projectId));

  const groupedByStatus = useMemo(() => {
    const columns = Object.fromEntries(
      columnOrder.map((s) => [s, [] as IssueType[]]),
    ) as ColumnMap;

    for (const issue of data.items) {
      columns[issue.status]?.push(issue);
    }
    return columns;
  }, [data.items, columnOrder]);

  const issueTree = useMemo(() => buildIssueTree(data.items), [data.items]);

  return { groupedByStatus, issueTree };
};
