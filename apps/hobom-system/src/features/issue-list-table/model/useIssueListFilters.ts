import { useCallback, useMemo, useState } from "react";
import type { IssueType, IssueKind, IssuePriority } from "@/entities/issue";
import { COLUMNS, type ColKey } from "../ui/issue-list-constants";

export const useIssueListFilters = () => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<IssuePriority | "">("");
  const [typeFilter, setTypeFilter] = useState<IssueKind | "">("");
  const [sortKey, setSortKey] = useState<ColKey | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filter = useCallback(
    (row: IssueType) => {
      if (statusFilter && row.status !== statusFilter) return false;
      if (priorityFilter && row.priority !== priorityFilter) return false;
      if (typeFilter && row.type !== typeFilter) return false;

      return true;
    },
    [statusFilter, priorityFilter, typeFilter],
  );

  const sort = useMemo(
    () =>
      sortKey
        ? [
            {
              key: sortKey as keyof IssueType,
              direction: sortDir as "asc" | "desc",
            },
          ]
        : [],
    [sortKey, sortDir],
  );

  const handleHeaderClick = useCallback(
    (colKey: ColKey) => {
      const col = COLUMNS.find((c) => c.key === colKey);

      if (!col?.sortable) return;
      if (sortKey === colKey) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(colKey);
        setSortDir("asc");
      }
    },
    [sortKey],
  );

  return {
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    typeFilter,
    setTypeFilter,
    filter,
    sort,
    sortKey,
    sortDir,
    handleHeaderClick,
  };
};
