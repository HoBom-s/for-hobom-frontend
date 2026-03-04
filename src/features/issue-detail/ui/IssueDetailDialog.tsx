import { useMemo, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  CloseOutlined,
  SubdirectoryArrowRightOutlined,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import {
  issueQueries,
  buildIssueTree,
  getDescendantProgress,
  isDescendantOf,
  useTransitionIssue,
  useUpdateIssue,
  getAvailableTransitions,
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  ISSUE_STATUS_CATEGORY_LABEL,
  PARENT_ISSUE_KINDS,
  type IssueType,
  type IssuePriority,
  type IssueTransition,
} from "@/entities/issue";
import { sprintQueries } from "@/entities/sprint";

const STATUS_COLOR: Record<string, string> = {
  TODO: "#5b6a98",
  IN_PROGRESS: "#4680ff",
  DONE: "#2ca87f",
};

const PRIORITY_COLOR: Record<string, string> = {
  CRITICAL: "#dc2626",
  HIGH: "#e58a00",
  MEDIUM: "#9ca3af",
  LOW: "#4680ff",
};

const KIND_COLOR: Record<string, string> = {
  EPIC: "#7c3aed",
  STORY: "#2ca87f",
  TASK: "#4680ff",
  BUG: "#dc2626",
  SUBTASK: "#0891b2",
};

interface IssueDetailDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  issueId: string | null;
  onNavigateToIssue?: (issueId: string) => void;
}

export const IssueDetailDialog = ({
  open,
  onClose,
  projectId,
  issueId,
  onNavigateToIssue,
}: IssueDetailDialogProps) => {
  const { data: issueData } = useQuery({
    ...issueQueries.listByProject(projectId),
    enabled: open && !!issueId,
  });
  const { data: sprintData } = useQuery({
    ...sprintQueries.listByProject(projectId),
    enabled: open && !!issueId,
  });
  const { mutate: transitionIssue } = useTransitionIssue(projectId);
  const { mutate: updateIssue } = useUpdateIssue();

  const [menuAnchor, setMenuAnchor] = useState<{
    el: HTMLElement;
    transitions: IssueTransition[];
  } | null>(null);
  const [priorityAnchor, setPriorityAnchor] = useState<HTMLElement | null>(
    null,
  );

  const issue = issueData?.items.find((i) => i.id === issueId);
  const sprintName = issue?.sprint
    ? sprintData?.items.find((s) => s.id === issue.sprint)?.name
    : null;

  const issueTree = useMemo(
    () => (issueData ? buildIssueTree(issueData.items) : null),
    [issueData],
  );

  const parentIssue = issue ? issueTree?.parentMap.get(issue.id) : undefined;
  const childIssues = issue ? (issueTree?.childrenMap.get(issue.id) ?? []) : [];

  const availableParents = useMemo(() => {
    if (!issueData || !issue || !issueTree) return [];
    return issueData.items.filter((candidate) => {
      if (!PARENT_ISSUE_KINDS.has(candidate.type)) return false;
      if (candidate.id === issue.id) return false;
      if (isDescendantOf(candidate.id, issue.id, issueTree.parentMap))
        return false;
      return true;
    });
  }, [issueData, issue, issueTree]);

  const progress =
    issue && issueTree
      ? getDescendantProgress(issue.id, issueTree.childrenMap)
      : null;

  const handleStatusClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!issue) return;
    const transitions = getAvailableTransitions(issue.status);
    if (transitions.length === 0) return;
    setMenuAnchor({ el: e.currentTarget, transitions });
  };

  const handleTransition = (transition: IssueTransition) => {
    if (!issue) return;
    transitionIssue({
      projectId,
      issueId: issue.id,
      statusId: transition.to,
    });
    setMenuAnchor(null);
  };

  const handlePriorityClick = (e: React.MouseEvent<HTMLElement>) => {
    setPriorityAnchor(e.currentTarget);
  };

  const handlePriorityChange = (priority: IssuePriority) => {
    if (!issue) return;
    updateIssue({ projectId, issueId: issue.id, priority });
    setPriorityAnchor(null);
  };

  return (
    <>
      <Dialog open={open && !!issue} onClose={onClose} maxWidth="sm" fullWidth>
        {issue && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                pr: 6,
              }}
            >
              <Chip
                label={ISSUE_KIND_LABEL[issue.type]}
                size="small"
                sx={{
                  height: 22,
                  fontSize: 11,
                  fontWeight: 700,
                  bgcolor: `${KIND_COLOR[issue.type]}18`,
                  color: KIND_COLOR[issue.type],
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", fontWeight: 600 }}
              >
                {issue.issueKey}
              </Typography>
              <IconButton
                onClick={onClose}
                size="small"
                sx={{ position: "absolute", right: 12, top: 12 }}
              >
                <CloseOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 0 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                {issue.title}
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  mb: 2,
                }}
              >
                <MetaRow label="상태">
                  <Chip
                    label={ISSUE_STATUS_CATEGORY_LABEL[issue.statusCategory]}
                    size="small"
                    onClick={handleStatusClick}
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: `${STATUS_COLOR[issue.statusCategory]}18`,
                      color: STATUS_COLOR[issue.statusCategory],
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: `${STATUS_COLOR[issue.statusCategory]}28`,
                      },
                    }}
                  />
                </MetaRow>
                <MetaRow label="우선순위">
                  <Chip
                    label={ISSUE_PRIORITY_LABEL[issue.priority]}
                    size="small"
                    onClick={handlePriorityClick}
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 500,
                      bgcolor: `${PRIORITY_COLOR[issue.priority]}18`,
                      color: PRIORITY_COLOR[issue.priority],
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: `${PRIORITY_COLOR[issue.priority]}28`,
                      },
                    }}
                  />
                </MetaRow>
                <MetaRow label="유형">
                  <Typography variant="body2" sx={{ fontSize: 13 }}>
                    {ISSUE_KIND_LABEL[issue.type]}
                  </Typography>
                </MetaRow>
                <MetaRow label="담당자">
                  {issue.assignee ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 22,
                          height: 22,
                          fontSize: 10,
                          fontWeight: 700,
                          bgcolor: "#e8eaed",
                          color: "#5f6368",
                        }}
                      >
                        {issue.assignee.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontSize: 13 }}>
                        {issue.assignee}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 13, color: "text.disabled" }}
                    >
                      -
                    </Typography>
                  )}
                </MetaRow>
                {sprintName && (
                  <MetaRow label="스프린트">
                    <Typography variant="body2" sx={{ fontSize: 13 }}>
                      {sprintName}
                    </Typography>
                  </MetaRow>
                )}
                {issue.storyPoints != null && (
                  <MetaRow label="스토리 포인트">
                    <Typography variant="body2" sx={{ fontSize: 13 }}>
                      {issue.storyPoints}
                    </Typography>
                  </MetaRow>
                )}
                {issue.dueDate && (
                  <MetaRow label="마감일">
                    <Typography variant="body2" sx={{ fontSize: 13 }}>
                      {issue.dueDate}
                    </Typography>
                  </MetaRow>
                )}
                <MetaRow label="상위 이슈">
                  <Autocomplete<IssueType>
                    size="small"
                    value={parentIssue ?? null}
                    options={availableParents}
                    getOptionLabel={(opt) => `${opt.issueKey} ${opt.title}`}
                    isOptionEqualToValue={(opt, val) => opt.id === val.id}
                    onChange={(_e, newValue) => {
                      updateIssue({
                        projectId,
                        issueId: issue.id,
                        parent: newValue?.id ?? null,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="상위 이슈 선택"
                        variant="outlined"
                      />
                    )}
                    sx={{ minWidth: 200 }}
                    noOptionsText="선택 가능한 상위 이슈 없음"
                  />
                </MetaRow>
              </Box>

              {issue.description && (
                <>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{ mb: 1, fontSize: 13 }}
                  >
                    설명
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 13,
                      color: "text.secondary",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {issue.description}
                  </Typography>
                </>
              )}

              {childIssues.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{ fontSize: 13 }}
                    >
                      하위 이슈 ({childIssues.length})
                    </Typography>
                    {progress && progress.total > 0 && (
                      <Chip
                        label={`${progress.completed}/${progress.total} 완료`}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: 10,
                          fontWeight: 600,
                          bgcolor:
                            progress.completed === progress.total
                              ? "#e8f5e9"
                              : "#fff3e0",
                          color:
                            progress.completed === progress.total
                              ? "#2ca87f"
                              : "#e58a00",
                        }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                    }}
                  >
                    {childIssues.map((child) => (
                      <Box
                        key={child.id}
                        onClick={() => onNavigateToIssue?.(child.id)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          px: 1.5,
                          py: 0.8,
                          borderRadius: 1.5,
                          cursor: onNavigateToIssue ? "pointer" : "default",
                          "&:hover": onNavigateToIssue
                            ? { bgcolor: "#f8f9fb" }
                            : undefined,
                          transition: "background 0.1s",
                        }}
                      >
                        <SubdirectoryArrowRightOutlined
                          sx={{ fontSize: 14, color: "text.disabled" }}
                        />
                        <Chip
                          label={ISSUE_KIND_LABEL[child.type]}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: 10,
                            fontWeight: 700,
                            bgcolor: `${KIND_COLOR[child.type]}18`,
                            color: KIND_COLOR[child.type],
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.disabled",
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        >
                          {child.issueKey}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ flex: 1, fontSize: 13 }}
                          noWrap
                        >
                          {child.title}
                        </Typography>
                        <Chip
                          label={
                            ISSUE_STATUS_CATEGORY_LABEL[child.statusCategory]
                          }
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: 10,
                            fontWeight: 600,
                            bgcolor: `${STATUS_COLOR[child.statusCategory]}18`,
                            color: STATUS_COLOR[child.statusCategory],
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>

      <Menu
        anchorEl={menuAnchor?.el}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        slotProps={{
          paper: { sx: { minWidth: 140, borderRadius: 2, boxShadow: 3 } },
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
                bgcolor: STATUS_COLOR[t.toCategory],
                mr: 1.5,
                flexShrink: 0,
              }}
            />
            {t.name}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={priorityAnchor}
        open={Boolean(priorityAnchor)}
        onClose={() => setPriorityAnchor(null)}
        slotProps={{
          paper: { sx: { minWidth: 140, borderRadius: 2, boxShadow: 3 } },
        }}
      >
        {(
          Object.entries(ISSUE_PRIORITY_LABEL) as [IssuePriority, string][]
        ).map(([key, label]) => (
          <MenuItem
            key={key}
            selected={issue?.priority === key}
            onClick={() => handlePriorityChange(key)}
            sx={{ fontSize: 13, py: 0.8 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: PRIORITY_COLOR[key],
                mr: 1.5,
                flexShrink: 0,
              }}
            />
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const MetaRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", py: 0.5 }}>
    <Typography
      variant="body2"
      sx={{ width: 100, color: "text.secondary", fontSize: 13, flexShrink: 0 }}
    >
      {label}
    </Typography>
    <Box sx={{ flex: 1 }}>{children}</Box>
  </Box>
);
