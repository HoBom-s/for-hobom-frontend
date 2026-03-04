import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  issueQueries,
  buildIssueTree,
  ISSUE_STATUS_CATEGORY_ORDER,
  type IssueType,
} from "@/entities/issue";
import type { ColumnMap } from "../lib/kanban-dnd.lib";

export const useKanbanBoard = (projectId: string) => {
  const { data } = useSuspenseQuery(issueQueries.listByProject(projectId));

  const groupedByStatus = useMemo(() => {
    const columns = Object.fromEntries(
      ISSUE_STATUS_CATEGORY_ORDER.map((s) => [s, [] as IssueType[]]),
    ) as ColumnMap;

    for (const issue of data.items) {
      columns[issue.statusCategory]?.push(issue);
    }
    return columns;
  }, [data.items]);

  const issueTree = useMemo(() => buildIssueTree(data.items), [data.items]);

  return { groupedByStatus, issueTree };
};
