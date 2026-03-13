import { useMemo, useState } from "react";
import { Bom } from "hobom-utils";
import type { IssueType, IssueTreeResult } from "@/entities/issue";
import {
  filterColumnsByEpic,
  buildSwimlaneGroups,
  type SwimlaneGroup,
} from "../lib/kanban-filter.lib";
import type { ColumnMap } from "../lib/kanban-dnd.lib";

interface UseKanbanFiltersParams {
  columns: ColumnMap;
  issueTree: IssueTreeResult;
  doneStatusIds: Set<string>;
  groupedByStatus: ColumnMap;
}

export const useKanbanFilters = ({
  columns,
  issueTree,
  doneStatusIds,
  groupedByStatus,
}: UseKanbanFiltersParams) => {
  const [epicFilter, setEpicFilter] = useState<string | null>(null);
  const [swimlaneEnabled, setSwimlaneEnabled] = useState(false);

  const epics = useMemo(
    () =>
      Bom.pipe(
        Object.values(groupedByStatus),
        Bom.flatMap((items) => items),
        Bom.filter((i: IssueType) => i.type === "EPIC"),
      ),
    [groupedByStatus],
  );

  const filteredColumns = useMemo(() => {
    if (!epicFilter) return columns;

    return filterColumnsByEpic(columns, epicFilter, issueTree.parentMap);
  }, [columns, epicFilter, issueTree.parentMap]);

  const swimlaneGroups = useMemo((): SwimlaneGroup[] | null => {
    if (!swimlaneEnabled) return null;
    const allIssues = Object.values(groupedByStatus).flat();

    return buildSwimlaneGroups(allIssues, issueTree, doneStatusIds);
  }, [swimlaneEnabled, groupedByStatus, issueTree, doneStatusIds]);

  const toggleSwimlane = () => setSwimlaneEnabled((v) => !v);

  return {
    epicFilter,
    setEpicFilter,
    swimlaneEnabled,
    toggleSwimlane,
    epics,
    filteredColumns,
    swimlaneGroups,
  };
};
