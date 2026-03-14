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
import { Hb, EmptyState } from "@/shared/ui";
import { useIssueListFilters } from "../model/useIssueListFilters";
import { useStatusTransitionMenu } from "../model/useStatusTransitionMenu";
import { IssueGrid } from "./IssueGrid";

interface IssueListTableProps {
  projectId: string;
  onIssueClick?: (issueId: string) => void;
}

export const IssueListTable = ({ projectId, onIssueClick }: IssueListTableProps) => {
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

  const { menuAnchor, handleStatusClick, handleTransition, closeMenu } = useStatusTransitionMenu(
    projectId,
    transitions,
  );

  return (
    <Hb.Box>
      <Hb.Box sx={{ display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
        <Hb.Form.Control size="small" sx={{ minWidth: 120 }}>
          <Hb.Form.Label shrink>상태</Hb.Form.Label>
          <Hb.Form.Select
            value={statusFilter}
            label="상태"
            displayEmpty
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <Hb.Menu.Item value="">전체</Hb.Menu.Item>
            {statuses.map((s) => (
              <Hb.Menu.Item key={s.id} value={s.id}>
                {s.name}
              </Hb.Menu.Item>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
        <Hb.Form.Control size="small" sx={{ minWidth: 120 }}>
          <Hb.Form.Label shrink>우선순위</Hb.Form.Label>
          <Hb.Form.Select
            value={priorityFilter}
            label="우선순위"
            displayEmpty
            onChange={(e) => setPriorityFilter(e.target.value as IssuePriority | "")}
          >
            <Hb.Menu.Item value="">전체</Hb.Menu.Item>
            {Object.entries(ISSUE_PRIORITY_LABEL).map(([k, label]) => (
              <Hb.Menu.Item key={k} value={k}>
                {label}
              </Hb.Menu.Item>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
        <Hb.Form.Control size="small" sx={{ minWidth: 120 }}>
          <Hb.Form.Label shrink>유형</Hb.Form.Label>
          <Hb.Form.Select
            value={typeFilter}
            label="유형"
            displayEmpty
            onChange={(e) => setTypeFilter(e.target.value as IssueKind | "")}
          >
            <Hb.Menu.Item value="">전체</Hb.Menu.Item>
            {Object.entries(ISSUE_KIND_LABEL).map(([k, label]) => (
              <Hb.Menu.Item key={k} value={k}>
                {label}
              </Hb.Menu.Item>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
      </Hb.Box>

      {data.items.length === 0 ? (
        <EmptyState message="조건에 맞는 이슈가 없어요" />
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

      <Hb.Menu.Root
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
          <Hb.Menu.Item
            key={t.to}
            onClick={() => handleTransition(t)}
            sx={{ fontSize: 13, py: 0.8 }}
          >
            <Hb.Box
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
          </Hb.Menu.Item>
        ))}
      </Hb.Menu.Root>
    </Hb.Box>
  );
};
