import { useCallback, useMemo, useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast, useOverlay } from "@/shared/model";
import {
  issueQueries,
  buildIssueTree,
  flattenIssueTree,
  getDescendantProgress,
  type IssueType,
} from "@/entities/issue";
import {
  sprintQueries,
  sprintMutations,
  SPRINT_STATUS_LABEL,
  type SprintType,
} from "@/entities/sprint";
import { STATUS_COLOR } from "./backlog-constants";
import { ConfirmDialog } from "./ConfirmDialog";
import { IssueRow } from "./IssueRow";

export const SprintSection = ({
  sprint,
  issues,
  sprints,
  projectId,
  onCreateChildIssue,
  onIssueClick,
}: {
  sprint: SprintType;
  issues: IssueType[];
  sprints: SprintType[];
  projectId: string;
  onCreateChildIssue?: (parentId: string) => void;
  onIssueClick?: (issueId: string) => void;
}) => {
  const issueTree = useMemo(() => buildIssueTree(issues), [issues]);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());
  const flatTree = useMemo(
    () => flattenIssueTree(issues, collapsedIds),
    [issues, collapsedIds],
  );
  const handleToggleCollapse = useCallback((issueId: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(issueId)) next.delete(issueId);
      else next.add(issueId);
      return next;
    });
  }, []);
  const [expanded, setExpanded] = useState(true);
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();
  const { onOpen } = useOverlay();

  const { mutate: startSprint, isPending: isStarting } = useMutation({
    ...sprintMutations.start(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: sprintQueries.sprints(),
      });
      openSuccessToast({ message: "스프린트를 시작했어요." });
    },
    onError: () => openErrorToast({ message: "스프린트를 시작하지 못했어요." }),
  });

  const { mutate: completeSprint, isPending: isCompleting } = useMutation({
    ...sprintMutations.complete(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: sprintQueries.sprints(),
      });
      await queryClient.invalidateQueries({
        queryKey: issueQueries.issues(),
      });
      openSuccessToast({ message: "스프린트를 완료했어요." });
    },
    onError: () => openErrorToast({ message: "스프린트를 완료하지 못했어요." }),
  });

  const handleStart = () => {
    onOpen(({ isOpen, onClose }) => (
      <ConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        title="스프린트 시작"
        description={`"${sprint.name}" 스프린트를 시작하시겠어요?`}
        isPending={isStarting}
        onConfirm={() => {
          startSprint(
            { projectId, sprintId: sprint.id },
            { onSuccess: onClose },
          );
        }}
      />
    ));
  };

  const handleComplete = () => {
    onOpen(({ isOpen, onClose }) => (
      <ConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        title="스프린트 완료"
        description={`"${sprint.name}" 스프린트를 완료하시겠어요? 완료되지 않은 이슈는 백로그로 이동합니다.`}
        isPending={isCompleting}
        onConfirm={() => {
          completeSprint(
            { projectId, sprintId: sprint.id },
            { onSuccess: onClose },
          );
        }}
      />
    ));
  };

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
          bgcolor: sprint.status === "ACTIVE" ? "#f0f4ff" : "#f8f9fb",
          cursor: "pointer",
          "&:hover": {
            bgcolor: sprint.status === "ACTIVE" ? "#e8eeff" : "#f0f2f5",
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
          <Box sx={{ px: 2, py: 4, textAlign: "center" }}>
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ fontSize: 13 }}
            >
              이슈를 이 스프린트로 이동해 보세요
            </Typography>
          </Box>
        ) : (
          flatTree.map(({ issue, depth, childCount }) => {
            const progress =
              childCount > 0
                ? getDescendantProgress(issue.id, issueTree.childrenMap)
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
      </Collapse>
    </Paper>
  );
};
