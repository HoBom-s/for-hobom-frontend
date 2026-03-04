import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
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
  ISSUE_KIND_REGISTRY,
  ISSUE_PRIORITY_LABEL,
  ISSUE_PRIORITY_REGISTRY,
  ISSUE_STATUS_CATEGORY_REGISTRY,
  PARENT_ISSUE_KINDS,
  type IssuePriority,
  type IssueTransition,
} from "@/entities/issue";
import { sprintQueries } from "@/entities/sprint";
import { IssueMetaSection } from "./IssueMetaSection";
import { IssueChildrenSection } from "./IssueChildrenSection";

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
    ? (sprintData?.items.find((s) => s.id === issue.sprint)?.name ?? null)
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
                  bgcolor: `${ISSUE_KIND_REGISTRY[issue.type].color}18`,
                  color: ISSUE_KIND_REGISTRY[issue.type].color,
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

              <IssueMetaSection
                issue={issue}
                sprintName={sprintName}
                parentIssue={parentIssue}
                availableParents={availableParents}
                onStatusClick={handleStatusClick}
                onPriorityClick={(e) => setPriorityAnchor(e.currentTarget)}
                onParentChange={(parent) => {
                  updateIssue({
                    projectId,
                    issueId: issue.id,
                    parent: parent?.id ?? null,
                  });
                }}
              />

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

              <IssueChildrenSection
                childIssues={childIssues}
                progress={progress}
                onNavigateToIssue={onNavigateToIssue}
              />
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
                bgcolor: ISSUE_STATUS_CATEGORY_REGISTRY[t.toCategory].color,
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
                bgcolor: ISSUE_PRIORITY_REGISTRY[key].color,
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
