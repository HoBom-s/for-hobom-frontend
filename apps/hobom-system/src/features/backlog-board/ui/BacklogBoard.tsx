import { useMemo } from "react";
import { InboxOutlined } from "hobom-design-system/icons";
import { useProjectContext, useVirtualList } from "@/shared/model";
import { Hb, EmptyState } from "@/shared/ui";
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
  const { issueTree, flatTree, collapsedIds, toggleCollapse } = useCollapsibleTree(backlogIssues);

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
      <Hb.Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sprintGroups.map(({ sprint, issues }) => (
          <SprintSection key={sprint.id} sprint={sprint} issues={issues} />
        ))}

        <Hb.Paper
          variant="outlined"
          style={{
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <Hb.Box
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
            <Hb.Text variant="subtitle2" fontWeight={700} sx={{ fontSize: 13 }}>
              백로그
            </Hb.Text>
            <Hb.Text variant="caption" color="text.disabled" sx={{ fontSize: 11 }}>
              {backlogIssues.length}건
            </Hb.Text>
          </Hb.Box>
          {backlogIssues.length === 0 ? (
            <EmptyState message="백로그에 이슈가 없어요" />
          ) : (
            <Hb.Box
              {...containerProps}
              sx={{
                ...containerProps.style,
                maxHeight: "calc(100vh - 300px)",
              }}
            >
              <Hb.Box sx={{ height: totalHeight, position: "relative" }}>
                {virtualItems.map(({ item, offsetTop }) => {
                  const { issue, depth, childCount } = item;
                  const progress =
                    childCount > 0
                      ? getDescendantProgress(issue.id, issueTree.childrenMap, doneStatusIds)
                      : undefined;

                  return (
                    <Hb.Box
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
                    </Hb.Box>
                  );
                })}
              </Hb.Box>
            </Hb.Box>
          )}
        </Hb.Paper>
      </Hb.Box>
    </BacklogContext.Provider>
  );
};
