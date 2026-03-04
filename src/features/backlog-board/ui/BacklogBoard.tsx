import { useCallback, useMemo, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { InboxOutlined } from "@mui/icons-material";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  issueQueries,
  buildIssueTree,
  flattenIssueTree,
  getDescendantProgress,
  type IssueType,
} from "@/entities/issue";
import { sprintQueries, type SprintType } from "@/entities/sprint";
import { SprintSection } from "./SprintSection";
import { IssueRow } from "./IssueRow";

interface BacklogBoardProps {
  projectId: string;
  onCreateChildIssue?: (parentId: string) => void;
  onIssueClick?: (issueId: string) => void;
}

export const BacklogBoard = ({
  projectId,
  onCreateChildIssue,
  onIssueClick,
}: BacklogBoardProps) => {
  const { data: issueData } = useSuspenseQuery(
    issueQueries.listByProject(projectId),
  );
  const { data: sprintData } = useSuspenseQuery(
    sprintQueries.listByProject(projectId),
  );
  const sprints = sprintData.items;
  const issues = issueData.items;

  const { sprintGroups, backlogIssues } = useMemo(() => {
    const sprintIds = new Set(sprints.map((s) => s.id));
    const groups: { sprint: SprintType; issues: IssueType[] }[] = [];

    for (const sprint of sprints) {
      groups.push({
        sprint,
        issues: issues.filter((i) => i.sprint === sprint.id),
      });
    }

    const backlog = issues.filter((i) => !i.sprint || !sprintIds.has(i.sprint));

    return { sprintGroups: groups, backlogIssues: backlog };
  }, [sprints, issues]);

  const backlogTree = useMemo(
    () => buildIssueTree(backlogIssues),
    [backlogIssues],
  );
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());
  const backlogFlatTree = useMemo(
    () => flattenIssueTree(backlogIssues, collapsedIds),
    [backlogIssues, collapsedIds],
  );
  const handleToggleCollapse = useCallback((issueId: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(issueId)) next.delete(issueId);
      else next.add(issueId);
      return next;
    });
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {sprintGroups.map(({ sprint, issues: sprintIssues }) => (
        <SprintSection
          key={sprint.id}
          sprint={sprint}
          issues={sprintIssues}
          sprints={sprints}
          projectId={projectId}
          onCreateChildIssue={onCreateChildIssue}
          onIssueClick={onIssueClick}
        />
      ))}

      <Paper variant="outlined" sx={{ borderRadius: 2.5, overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1.2,
            bgcolor: "#f8f9fb",
          }}
        >
          <InboxOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ fontSize: 13 }}
          >
            백로그
          </Typography>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ fontSize: 11 }}
          >
            {backlogIssues.length}건
          </Typography>
        </Box>
        {backlogIssues.length === 0 ? (
          <Box sx={{ px: 2, py: 4, textAlign: "center" }}>
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ fontSize: 13 }}
            >
              백로그에 이슈가 없어요
            </Typography>
          </Box>
        ) : (
          backlogFlatTree.map(({ issue, depth, childCount }) => {
            const progress =
              childCount > 0
                ? getDescendantProgress(issue.id, backlogTree.childrenMap)
                : undefined;
            return (
              <IssueRow
                key={issue.id}
                issue={issue}
                sprints={sprints}
                projectId={projectId}
                depth={depth}
                childCount={childCount}
                isCollapsed={collapsedIds.has(issue.id)}
                onToggleCollapse={handleToggleCollapse}
                progress={progress}
                onCreateChildIssue={onCreateChildIssue}
                onIssueClick={onIssueClick}
              />
            );
          })
        )}
      </Paper>
    </Box>
  );
};
