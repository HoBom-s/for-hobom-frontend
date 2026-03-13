import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  PlayArrowOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
import { getDescendantProgress, type IssueType } from "@/entities/issue";
import { SPRINT_STATUS_LABEL, type SprintType } from "@/entities/sprint";
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
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2.5,
        overflow: "hidden",
        borderColor: sprint.status === "ACTIVE" ? "#4680ff40" : "divider",
      }}
    >
      <Box
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
        <IconButton size="small" sx={{ p: 0 }}>
          {expanded ? (
            <ExpandMore sx={{ fontSize: 20 }} />
          ) : (
            <ExpandLess sx={{ fontSize: 20 }} />
          )}
        </IconButton>
        <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: 13 }}>
          {sprint.name}
        </Typography>
        <Chip
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
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ fontSize: 11 }}
        >
          {issues.length}건
        </Typography>
        <Box sx={{ flex: 1 }} />
        {sprint.status === "PLANNING" && (
          <Button
            size="small"
            variant="contained"
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
          </Button>
        )}
        {sprint.status === "ACTIVE" && (
          <Button
            size="small"
            variant="outlined"
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
          </Button>
        )}
      </Box>
      <Collapse in={expanded}>
        {issues.length === 0 ? (
          <Box sx={{ px: 2, py: 3, textAlign: "center" }}>
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ fontSize: 13 }}
            >
              스프린트에 이슈가 없어요
            </Typography>
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ fontSize: 11 }}
            >
              백로그 이슈의 ⋮ 메뉴에서 이 스프린트로 이동할 수 있어요
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
      </Collapse>
    </Paper>
  );
};
