import {
  Box,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useProjectContext } from "@/shared/model";
import {
  issueQueries,
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  type IssueKind,
  type IssuePriority,
} from "@/entities/issue";
import { getStatusColor } from "@/entities/project";
import { useIssueListFilters } from "../model/useIssueListFilters";
import { useStatusTransitionMenu } from "../model/useStatusTransitionMenu";
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
  const { statuses, transitions } = useProjectContext();
  const { data } = useSuspenseQuery(issueQueries.listByProject(projectId));

  const {
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
  } = useIssueListFilters();

  const { menuAnchor, handleStatusClick, handleTransition, closeMenu } =
    useStatusTransitionMenu(projectId, transitions);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel shrink>상태</InputLabel>
          <Select
            value={statusFilter}
            label="상태"
            displayEmpty
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">전체</MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
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

      {data.items.length === 0 ? (
        <EmptyState />
      ) : (
        <IssueGrid
          items={data.items}
          statuses={statuses}
          filter={filter}
          sort={sort}
          sortKey={sortKey}
          sortDir={sortDir}
          onHeaderClick={handleHeaderClick}
          onStatusClick={handleStatusClick}
          onRowClick={onIssueClick}
        />
      )}

      <Menu
        anchorEl={menuAnchor?.el}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
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
                bgcolor: getStatusColor(statuses, t.to),
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
