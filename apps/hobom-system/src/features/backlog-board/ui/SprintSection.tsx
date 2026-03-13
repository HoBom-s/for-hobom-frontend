import { useState } from "react";
import {
  ExpandMore,
  ExpandLess,
  PlayArrowOutlined,
  CheckCircleOutline,
} from "hobom-design-system/icons";
import { getDescendantProgress, type IssueType } from "@/entities/issue";
import { SPRINT_STATUS_LABEL, type SprintType } from "@/entities/sprint";
import { Hb } from "@/shared/ui";
import { useBacklogContext } from "../model/useBacklogContext";
import { useCollapsibleTree } from "../model/useCollapsibleTree";
import { useSprintActions } from "../model/useSprintActions";
import { STATUS_COLOR } from "./backlog-constants";
import { IssueRow } from "./IssueRow";

export const SprintSection = ({
  sprint,
  issues,
}: {
  sprint: SprintType;
  issues: IssueType[];
}) => {
  const { projectId, doneStatusIds } = useBacklogContext();
  const { issueTree, flatTree, collapsedIds, toggleCollapse } =
    useCollapsibleTree(issues);
  const { handleStart, handleComplete } = useSprintActions(projectId, sprint);
  const [expanded, setExpanded] = useState(true);

  return (
    <Hb.Paper
      variant="outlined"
      sx={{
        borderRadius: 2.5,
        overflow: "hidden",
        borderColor: sprint.status === "ACTIVE" ? "#4680ff40" : "divider",
      }}
    >
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.2,
          bgcolor:
            sprint.status === "ACTIVE"
              ? "rgba(var(--mui-palette-primary-mainChannel) / 0.06)"
              : "action.hover",
          cursor: "pointer",
          "&:hover": {
            bgcolor:
              sprint.status === "ACTIVE"
                ? "rgba(var(--mui-palette-primary-mainChannel) / 0.1)"
                : "action.selected",
          },
          transition: "background 0.15s",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Hb.Button.Icon size="small" sx={{ p: 0 }}>
          {expanded ? (
            <ExpandMore sx={{ fontSize: 20 }} />
          ) : (
            <ExpandLess sx={{ fontSize: 20 }} />
          )}
        </Hb.Button.Icon>
        <Hb.Text variant="subtitle2" fontWeight={700} sx={{ fontSize: 13 }}>
          {sprint.name}
        </Hb.Text>
        <Hb.Chip
          label={SPRINT_STATUS_LABEL[sprint.status]}
          size="small"
          sx={{
            height: 20,
            fontSize: 10,
            fontWeight: 700,
            bgcolor: `${STATUS_COLOR[sprint.status]}18`,
            color: STATUS_COLOR[sprint.status],
            letterSpacing: "0.02em",
          }}
        />
        <Hb.Text variant="caption" color="text.disabled" sx={{ fontSize: 11 }}>
          {issues.length}건
        </Hb.Text>
        <Hb.Box sx={{ flex: 1 }} />
        {sprint.status === "PLANNING" && (
          <Hb.Button
            size="small"
            variant="primary"
            startIcon={<PlayArrowOutlined sx={{ fontSize: 14 }} />}
            onClick={(e) => {
              e.stopPropagation();
              handleStart();
            }}
            sx={{
              fontSize: 11,
              textTransform: "none",
              boxShadow: "none",
              borderRadius: 1.5,
              py: 0.3,
              px: 1.5,
              fontWeight: 600,
              "&:hover": { boxShadow: "0 2px 8px rgba(70,128,255,0.3)" },
            }}
          >
            스프린트 시작
          </Hb.Button>
        )}
        {sprint.status === "ACTIVE" && (
          <Hb.Button
            size="small"
            variant="secondary"
            startIcon={<CheckCircleOutline sx={{ fontSize: 14 }} />}
            onClick={(e) => {
              e.stopPropagation();
              handleComplete();
            }}
            sx={{
              fontSize: 11,
              textTransform: "none",
              borderRadius: 1.5,
              py: 0.3,
              px: 1.5,
              fontWeight: 600,
            }}
          >
            스프린트 완료
          </Hb.Button>
        )}
      </Hb.Box>
      <Hb.Collapse in={expanded}>
        {issues.length === 0 ? (
          <Hb.Box sx={{ px: 2, py: 3, textAlign: "center" }}>
            <Hb.Text
              variant="body2"
              color="text.disabled"
              sx={{ fontSize: 13 }}
            >
              스프린트에 이슈가 없어요
            </Hb.Text>
            <Hb.Text
              variant="caption"
              color="text.disabled"
              sx={{ fontSize: 11 }}
            >
              백로그 이슈의 ⋮ 메뉴에서 이 스프린트로 이동할 수 있어요
            </Hb.Text>
          </Hb.Box>
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
      </Hb.Collapse>
    </Hb.Paper>
  );
};
