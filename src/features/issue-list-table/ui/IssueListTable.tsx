import { useCallback, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  issueQueries,
  useTransitionIssue,
  getAvailableTransitions,
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  ISSUE_STATUS_CATEGORY_LABEL,
  type IssueType,
  type IssueKind,
  type IssuePriority,
  type IssueStatusCategory,
  type IssueTransition,
} from "@/entities/issue";
import {
  COLUMNS,
  type ColKey,
  STATUS_CHIP_COLOR,
} from "./issue-list-constants";
import { IssueGrid } from "./IssueGrid";
import { EmptyState } from "./EmptyState";

interface IssueListTableProps {
  projectId: string;
  onIssueClick?: (issueId: string) => void;
}

export const IssueListTable = ({
  projectId,
  onIssueClick,
}: IssueListTableProps) => {
  const { data } = useSuspenseQuery(issueQueries.listByProject(projectId));
  const { mutate: transitionIssue } = useTransitionIssue(projectId);

  const [statusFilter, setStatusFilter] = useState<IssueStatusCategory | "">(
    "",
  );
  const [priorityFilter, setPriorityFilter] = useState<IssuePriority | "">("");
  const [typeFilter, setTypeFilter] = useState<IssueKind | "">("");

  const [sortKey, setSortKey] = useState<ColKey | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [menuAnchor, setMenuAnchor] = useState<{
    el: HTMLElement;
    issueId: string;
    transitions: IssueTransition[];
  } | null>(null);

  const filter = useCallback(
    (row: IssueType) => {
      if (statusFilter && row.statusCategory !== statusFilter) return false;
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

  const handleHeaderClick = (colKey: ColKey) => {
    const col = COLUMNS.find((c) => c.key === colKey);
    if (!col?.sortable) return;
    if (sortKey === colKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(colKey);
      setSortDir("asc");
    }
  };

  const handleStatusClick = (
    e: React.MouseEvent<HTMLElement>,
    issueId: string,
    currentStatus: string,
  ) => {
    e.stopPropagation();
    const transitions = getAvailableTransitions(currentStatus);
    if (transitions.length === 0) return;
    setMenuAnchor({ el: e.currentTarget, issueId, transitions });
  };

  const handleTransition = (transition: IssueTransition) => {
    if (menuAnchor) {
      transitionIssue({
        projectId,
        issueId: menuAnchor.issueId,
        statusId: transition.to,
      });
    }
    setMenuAnchor(null);
  };

  return (
    <Box>
      {/* 필터 바 */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel shrink>상태</InputLabel>
          <Select
            value={statusFilter}
            label="상태"
            displayEmpty
            onChange={(e) =>
              setStatusFilter(e.target.value as IssueStatusCategory | "")
            }
          >
            <MenuItem value="">전체</MenuItem>
            {Object.entries(ISSUE_STATUS_CATEGORY_LABEL).map(([k, label]) => (
              <MenuItem key={k} value={k}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel shrink>우선순위</InputLabel>
          <Select
            value={priorityFilter}
            label="우선순위"
            displayEmpty
            onChange={(e) =>
              setPriorityFilter(e.target.value as IssuePriority | "")
            }
          >
            <MenuItem value="">전체</MenuItem>
            {Object.entries(ISSUE_PRIORITY_LABEL).map(([k, label]) => (
              <MenuItem key={k} value={k}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel shrink>유형</InputLabel>
          <Select
            value={typeFilter}
            label="유형"
            displayEmpty
            onChange={(e) => setTypeFilter(e.target.value as IssueKind | "")}
          >
            <MenuItem value="">전체</MenuItem>
            {Object.entries(ISSUE_KIND_LABEL).map(([k, label]) => (
              <MenuItem key={k} value={k}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* 그리드 */}
      {data.items.length === 0 ? (
        <EmptyState />
      ) : (
        <IssueGrid
          items={data.items}
          filter={filter}
          sort={sort}
          sortKey={sortKey}
          sortDir={sortDir}
          onHeaderClick={handleHeaderClick}
          onStatusClick={handleStatusClick}
          onRowClick={onIssueClick}
        />
      )}

      {/* 상태 전환 메뉴 */}
      <Menu
        anchorEl={menuAnchor?.el}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        slotProps={{
          paper: {
            sx: { minWidth: 140, borderRadius: 2, boxShadow: 3 },
          },
        }}
      >
        {menuAnchor?.transitions.map((t) => (
          <MenuItem
            key={t.to}
            onClick={() => handleTransition(t)}
            sx={{ fontSize: 13, py: 0.8 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: STATUS_CHIP_COLOR[t.toCategory],
                mr: 1.5,
                flexShrink: 0,
              }}
            />
            {t.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
