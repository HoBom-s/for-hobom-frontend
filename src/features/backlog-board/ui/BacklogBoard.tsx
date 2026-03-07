import { useMemo } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { InboxOutlined } from "@mui/icons-material";
import { useProjectContext } from "@/shared/model";
import { getDescendantProgress } from "@/entities/issue";
import { BacklogContext } from "../model/useBacklogContext";
import { useBacklogBoard } from "../model/useBacklogBoard";
import { useCollapsibleTree } from "../model/useCollapsibleTree";
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
  const { doneStatusIds } = useProjectContext();
  const { sprints, sprintGroups, backlogIssues } = useBacklogBoard(projectId);
  const { issueTree, flatTree, collapsedIds, toggleCollapse } =
    useCollapsibleTree(backlogIssues);

  const contextValue = useMemo(
    () => ({
      sprints,
      projectId,
      doneStatusIds,
      onCreateChildIssue,
      onIssueClick,
    }),
    [sprints, projectId, doneStatusIds, onCreateChildIssue, onIssueClick],
  );

  return (
    <BacklogContext.Provider value={contextValue}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sprintGroups.map(({ sprint, issues }) => (
          <SprintSection key={sprint.id} sprint={sprint} issues={issues} />
        ))}

        <Paper
          variant="outlined"
          sx={{ borderRadius: 2.5, overflow: "hidden" }}
        >
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
            flatTree.map(({ issue, depth, childCount }) => {
              const progress =
                childCount > 0
                  ? getDescendantProgress(
                      issue.id,
                      issueTree.childrenMap,
                      doneStatusIds,
                    )
                  : undefined;
              return (
                <IssueRow
                  key={issue.id}
                  issue={issue}
                  depth={depth}
                  childCount={childCount}
                  isCollapsed={collapsedIds.has(issue.id)}
                  onToggleCollapse={toggleCollapse}
                  progress={progress}
                />
              );
            })
          )}
        </Paper>
      </Box>
    </BacklogContext.Provider>
  );
};
