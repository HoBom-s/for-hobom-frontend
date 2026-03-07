import { useMemo } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { InboxOutlined } from "@mui/icons-material";
import { useProjectContext, useVirtualList } from "@/shared/model";
import { EmptyState } from "@/shared/ui";
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

  const { containerProps, virtualItems, totalHeight } = useVirtualList({
    items: flatTree,
    itemHeight: 44,
  });

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
              bgcolor: "action.hover",
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
            <EmptyState message="백로그에 이슈가 없어요" />
          ) : (
            <Box
              {...containerProps}
              sx={{
                ...containerProps.style,
                maxHeight: "calc(100vh - 300px)",
              }}
            >
              <Box sx={{ height: totalHeight, position: "relative" }}>
                {virtualItems.map(({ item, offsetTop }) => {
                  const { issue, depth, childCount } = item;
                  const progress =
                    childCount > 0
                      ? getDescendantProgress(
                          issue.id,
                          issueTree.childrenMap,
                          doneStatusIds,
                        )
                      : undefined;
                  return (
                    <Box
                      key={issue.id}
                      sx={{
                        position: "absolute",
                        top: offsetTop,
                        width: "100%",
                        height: 44,
                      }}
                    >
                      <IssueRow
                        issue={issue}
                        depth={depth}
                        childCount={childCount}
                        isCollapsed={collapsedIds.has(issue.id)}
                        onToggleCollapse={toggleCollapse}
                        progress={progress}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </BacklogContext.Provider>
  );
};
