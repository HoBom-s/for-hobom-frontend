import { useMemo } from "react";
import { useQuery, useSuspenseQuery } from "hobom-data";
import { useCsvExport } from "@hobom-grid/react";
import { CloudDownloadOutlined } from "hobom-design-system/icons";
import {
  issueQueries,
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  type IssueKind,
  type IssuePriority,
  type IssueType,
} from "@/entities/issue";
import { getStatusColor, useProjectContext } from "@/entities/project";
import { projectLabelQueries } from "@/entities/project-label";
import { userQueries } from "@/entities/user";
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
  const { data: labelData } = useQuery(projectLabelQueries.listByProject(projectId));
  const labelMap = useMemo(
    () => new Map((labelData?.items ?? []).map((l) => [l.id, l])),
    [labelData?.items],
  );
  const { data: usersData } = useQuery(userQueries.list());
  const memberMap = useMemo(
    () => new Map((usersData?.items ?? []).map((u) => [u.id, u.nickname])),
    [usersData?.items],
  );

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

  const csvExport = useCsvExport<IssueType>({
    columns: [
      { label: "키", getValue: (r) => r.issueKey },
      { label: "유형", getValue: (r) => r.type },
      { label: "제목", getValue: (r) => r.title },
      { label: "상태", getValue: (r) => r.status },
      { label: "우선순위", getValue: (r) => r.priority },
      {
        label: "담당자",
        getValue: (r) => (r.assignee ? (memberMap.get(r.assignee) ?? r.assignee) : ""),
      },
      {
        label: "라벨",
        getValue: (r) => r.labels.map((id) => labelMap.get(id)?.name ?? id).join(", "),
      },
      { label: "스토리 포인트", getValue: (r) => r.storyPoints ?? "" },
      { label: "마감일", getValue: (r) => r.dueDate ?? "" },
    ],
  });

  return (
    <Hb.Box>
      <Hb.Box
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Hb.Form.Control size="small" style={{
          minWidth: 120
        }}>
          <Hb.Form.Label shrink>상태</Hb.Form.Label>
          <Hb.Form.Select
            value={statusFilter}
            label="상태"
            displayEmpty
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <Hb.Form.Option value="">전체</Hb.Form.Option>
            {statuses.map((s) => (
              <Hb.Form.Option key={s.id} value={s.id}>
                {s.name}
              </Hb.Form.Option>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
        <Hb.Form.Control size="small" style={{
          minWidth: 120
        }}>
          <Hb.Form.Label shrink>우선순위</Hb.Form.Label>
          <Hb.Form.Select
            value={priorityFilter}
            label="우선순위"
            displayEmpty
            onChange={(e) => setPriorityFilter(e.target.value as IssuePriority | "")}
          >
            <Hb.Form.Option value="">전체</Hb.Form.Option>
            {Object.entries(ISSUE_PRIORITY_LABEL).map(([k, label]) => (
              <Hb.Form.Option key={k} value={k}>
                {label}
              </Hb.Form.Option>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
        <Hb.Form.Control size="small" style={{
          minWidth: 120
        }}>
          <Hb.Form.Label shrink>유형</Hb.Form.Label>
          <Hb.Form.Select
            value={typeFilter}
            label="유형"
            displayEmpty
            onChange={(e) => setTypeFilter(e.target.value as IssueKind | "")}
          >
            <Hb.Form.Option value="">전체</Hb.Form.Option>
            {Object.entries(ISSUE_KIND_LABEL).map(([k, label]) => (
              <Hb.Form.Option key={k} value={k}>
                {label}
              </Hb.Form.Option>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
        <Hb.Box
          style={{
            flex: 1,
          }}
        />
        <Hb.Button
          size="small"
          variant="secondary"
          startIcon={<CloudDownloadOutlined />}
          onClick={() => csvExport.exportCsv(data.items, "issues.csv")}
        >
          CSV 내보내기
        </Hb.Button>
      </Hb.Box>
      {data.items.length === 0 ? (
        <EmptyState message="조건에 맞는 이슈가 없어요" />
      ) : (
        <IssueGrid
          items={data.items}
          statuses={statuses}
          labelMap={labelMap}
          memberMap={memberMap}
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
        style={{ minWidth: 140, borderRadius: 16 }}
      >
        {menuAnchor?.transitions.map((t) => (
          <Hb.Menu.Item
            key={t.to}
            onClick={() => handleTransition(t)}
            style={{ fontSize: 13, paddingBlock: 6.4 }}
          >
            <Hb.Box
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: getStatusColor(statuses, t.to),
                marginRight: 12,
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
