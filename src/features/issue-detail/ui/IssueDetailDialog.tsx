import { useMemo } from "react";
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
import { useProjectContext } from "@/shared/model";
import {
  ISSUE_KIND_LABEL,
  ISSUE_KIND_REGISTRY,
  ISSUE_PRIORITY_LABEL,
  ISSUE_PRIORITY_REGISTRY,
  type IssuePriority,
} from "@/entities/issue";
import { getStatusColor } from "@/entities/project";
import { IssueDetailContext } from "../model/useIssueDetailContext";
import { useIssueDetailState } from "../model/useIssueDetailState";
import { useIssueDetailActions } from "../model/useIssueDetailActions";
import { IssueMetaSection } from "./IssueMetaSection";
import { IssueChildrenSection } from "./IssueChildrenSection";
import { IssueCommentsSection } from "./IssueCommentsSection";

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
  const { statuses } = useProjectContext();
  const enabled = open && !!issueId;

  const state = useIssueDetailState(projectId, issueId, enabled);
  const actions = useIssueDetailActions(projectId, state.issue);
  const { issue } = state;

  const contextValue = useMemo(
    () =>
      issue
        ? { ...state, issue, ...actions, projectId, onNavigateToIssue }
        : null,
    [state, issue, actions, projectId, onNavigateToIssue],
  );

  return (
    <>
      <Dialog open={open && !!issue} onClose={onClose} maxWidth="sm" fullWidth>
        {issue && contextValue && (
          <IssueDetailContext.Provider value={contextValue}>
            <DialogTitle
              sx={{ display: "flex", alignItems: "center", gap: 1, pr: 6 }}
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
                aria-label="닫기"
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

              <IssueMetaSection />

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

              <IssueChildrenSection />
              <IssueCommentsSection />
            </DialogContent>
          </IssueDetailContext.Provider>
        )}
      </Dialog>

      {/* Status Menu */}
      <Menu
        anchorEl={actions.statusMenu.anchor?.el}
        open={Boolean(actions.statusMenu.anchor)}
        onClose={actions.statusMenu.close}
        aria-label="상태 변경"
        slotProps={{
          paper: { sx: { minWidth: 140, borderRadius: 2, boxShadow: 3 } },
        }}
      >
        {actions.statusMenu.anchor?.transitions.map((t) => (
          <MenuItem
            key={t.to}
            onClick={() => actions.statusMenu.handleTransition(t)}
            sx={{ fontSize: 13, py: 0.8 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: getStatusColor(statuses, t.to),
                mr: 1.5,
                flexShrink: 0,
              }}
            />
            {t.name}
          </MenuItem>
        ))}
      </Menu>

      {/* Priority Menu */}
      <Menu
        anchorEl={actions.priorityMenu.anchor}
        open={Boolean(actions.priorityMenu.anchor)}
        onClose={actions.priorityMenu.close}
        aria-label="우선순위 변경"
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
            onClick={() => actions.priorityMenu.handleChange(key)}
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
