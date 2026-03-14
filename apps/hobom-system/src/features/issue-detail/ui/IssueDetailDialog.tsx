import { useMemo } from "react";
import { CloseOutlined, PersonOffOutlined } from "hobom-design-system/icons";
import { useProjectContext } from "@/shared/model";
import { Hb, ErrorBoundary } from "@/shared/ui";
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
    () => (issue ? { ...state, issue, ...actions, projectId, onNavigateToIssue } : null),
    [state, issue, actions, projectId, onNavigateToIssue],
  );

  return (
    <>
      <Hb.Dialog.Root open={open && !!issue} onClose={onClose} size="sm">
        {issue && contextValue && (
          <IssueDetailContext.Provider value={contextValue}>
            <Hb.Dialog.Title sx={{ display: "flex", alignItems: "center", gap: 1, pr: 6 }}>
              <Hb.Chip
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
              <Hb.Text variant="caption" sx={{ color: "text.disabled", fontWeight: 600 }}>
                {issue.issueKey}
              </Hb.Text>
              <Hb.Button.Icon
                onClick={onClose}
                size="small"
                aria-label="닫기"
                sx={{ position: "absolute", right: 12, top: 12 }}
              >
                <CloseOutlined sx={{ fontSize: 18 }} />
              </Hb.Button.Icon>
            </Hb.Dialog.Title>
            <Hb.Dialog.Content sx={{ pt: 0 }}>
              <ErrorBoundary inline resetKey={issueId ?? ""}>
                <Hb.Text variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  {issue.title}
                </Hb.Text>
                <Hb.Divider sx={{ mb: 2 }} />

                <IssueMetaSection />

                {issue.description && (
                  <>
                    <Hb.Divider sx={{ mb: 2 }} />
                    <Hb.Text variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: 13 }}>
                      설명
                    </Hb.Text>
                    <Hb.Text
                      variant="body2"
                      sx={{
                        fontSize: 13,
                        color: "text.secondary",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {issue.description}
                    </Hb.Text>
                  </>
                )}

                <IssueChildrenSection />
                <IssueCommentsSection />
              </ErrorBoundary>
            </Hb.Dialog.Content>
          </IssueDetailContext.Provider>
        )}
      </Hb.Dialog.Root>

      {/* Status Menu */}
      <Hb.Menu.Root
        anchorEl={actions.statusMenu.anchor?.el}
        open={Boolean(actions.statusMenu.anchor)}
        onClose={actions.statusMenu.close}
        aria-label="상태 변경"
        slotProps={{
          paper: { sx: { minWidth: 140, borderRadius: 2, boxShadow: 3 } },
        }}
      >
        {actions.statusMenu.anchor?.transitions.map((t) => (
          <Hb.Menu.Item
            key={t.to}
            onClick={() => actions.statusMenu.handleTransition(t)}
            sx={{ fontSize: 13, py: 0.8 }}
          >
            <Hb.Box
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
          </Hb.Menu.Item>
        ))}
      </Hb.Menu.Root>

      {/* Priority Menu */}
      <Hb.Menu.Root
        anchorEl={actions.priorityMenu.anchor}
        open={Boolean(actions.priorityMenu.anchor)}
        onClose={actions.priorityMenu.close}
        aria-label="우선순위 변경"
        slotProps={{
          paper: { sx: { minWidth: 140, borderRadius: 2, boxShadow: 3 } },
        }}
      >
        {(Object.entries(ISSUE_PRIORITY_LABEL) as [IssuePriority, string][]).map(([key, label]) => (
          <Hb.Menu.Item
            key={key}
            selected={issue?.priority === key}
            onClick={() => actions.priorityMenu.handleChange(key)}
            sx={{ fontSize: 13, py: 0.8 }}
          >
            <Hb.Box
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
          </Hb.Menu.Item>
        ))}
      </Hb.Menu.Root>

      {/* Assignee Menu */}
      <Hb.Menu.Root
        anchorEl={actions.assigneeMenu.anchor}
        open={Boolean(actions.assigneeMenu.anchor)}
        onClose={actions.assigneeMenu.close}
        aria-label="담당자 변경"
        role="listbox"
        slotProps={{
          paper: { sx: { minWidth: 160, borderRadius: 2, boxShadow: 3 } },
        }}
      >
        <Hb.Menu.Item
          role="option"
          aria-selected={!issue?.assignee}
          selected={!issue?.assignee}
          onClick={() => actions.assigneeMenu.handleAssign(undefined)}
          sx={{ fontSize: 13, py: 0.8 }}
        >
          <Hb.List.ItemIcon sx={{ minWidth: 32 }}>
            <PersonOffOutlined aria-hidden sx={{ fontSize: 18, color: "text.disabled" }} />
          </Hb.List.ItemIcon>
          <Hb.List.ItemText primary="미할당" slotProps={{ primary: { sx: { fontSize: 13 } } }} />
        </Hb.Menu.Item>
        {state.projectMembers.map((member) => {
          const isSelected = issue?.assignee === member.userId;

          return (
            <Hb.Menu.Item
              key={member.userId}
              role="option"
              aria-selected={isSelected}
              selected={isSelected}
              onClick={() => actions.assigneeMenu.handleAssign(member.userId)}
              sx={{ fontSize: 13, py: 0.8 }}
            >
              <Hb.List.ItemIcon sx={{ minWidth: 32 }}>
                <Hb.Avatar
                  alt={member.nickname}
                  sx={{
                    width: 22,
                    height: 22,
                    fontSize: 10,
                    fontWeight: 700,
                    bgcolor: "action.selected",
                    color: "text.secondary",
                  }}
                >
                  {member.nickname.charAt(0).toUpperCase()}
                </Hb.Avatar>
              </Hb.List.ItemIcon>
              <Hb.List.ItemText
                primary={member.nickname}
                slotProps={{ primary: { sx: { fontSize: 13 } } }}
              />
            </Hb.Menu.Item>
          );
        })}
      </Hb.Menu.Root>
    </>
  );
};
