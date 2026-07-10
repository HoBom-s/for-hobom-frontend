import { useMemo } from "react";
import { CloseOutlined, PersonOffOutlined } from "hobom-design-system/icons";
import { Hb, ErrorBoundary } from "@/shared/ui";
import { ISSUE_KIND_LABEL, ISSUE_PRIORITY_LABEL, type IssuePriority } from "@/entities/issue";
import { ISSUE_KIND_REGISTRY, ISSUE_PRIORITY_REGISTRY } from "@/entities/issue/ui";
import { getStatusColor, useProjectContext } from "@/entities/project";
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
            <Hb.Dialog.Title style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingRight: 48
            }}>
              <Hb.Chip
                label={ISSUE_KIND_LABEL[issue.type]}
                size="small"
                style={{
                  height: 22,
                  fontSize: 11,
                  fontWeight: 700,
                  backgroundColor: `${ISSUE_KIND_REGISTRY[issue.type].color}18`,
                  color: ISSUE_KIND_REGISTRY[issue.type].color,
                }}
              />
              <Hb.Text
                variant="caption"
                style={{
                  color: "var(--hb-color-text-disabled)",
                  fontWeight: 600,
                }}
              >
                {issue.issueKey}
              </Hb.Text>
              <Hb.Button.Icon
                onClick={onClose}
                size="small"
                aria-label="닫기"
                style={{
                  position: "absolute",
                  right: 12,
                  top: 12,
                }}
              >
                <CloseOutlined sx={{ fontSize: 18 }} />
              </Hb.Button.Icon>
            </Hb.Dialog.Title>
            <Hb.Dialog.Content style={{
              paddingTop: 0
            }}>
              <ErrorBoundary inline resetKey={issueId ?? ""}>
                <Hb.Text
                  variant="h6"
                  fontWeight={700}
                  style={{
                    marginBottom: 16,
                  }}
                >
                  {issue.title}
                </Hb.Text>
                <Hb.Divider
                  style={{
                    marginBottom: 16,
                  }}
                />

                <IssueMetaSection />

                {issue.description && (
                  <>
                    <Hb.Divider
                      style={{
                        marginBottom: 16,
                      }}
                    />
                    <Hb.Text
                      variant="subtitle2"
                      fontWeight={600}
                      style={{
                        marginBottom: 8,
                        fontSize: 13,
                      }}
                    >
                      설명
                    </Hb.Text>
                    <Hb.Text
                      variant="body2"
                      style={{
                        fontSize: 13,
                        color: "var(--hb-color-text-secondary)",
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
        style={{ minWidth: 140, borderRadius: 16 }}
      >
        {actions.statusMenu.anchor?.transitions.map((t) => (
          <Hb.Menu.Item
            key={t.to}
            onClick={() => actions.statusMenu.handleTransition(t)}
            style={{ fontSize: 13, paddingBlock: 6.4 }}
          >
            <Hb.Box
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: getStatusColor(statuses, t.to),
                marginRight: 12,
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
        style={{ minWidth: 140, borderRadius: 16 }}
      >
        {(Object.entries(ISSUE_PRIORITY_LABEL) as [IssuePriority, string][]).map(([key, label]) => (
          <Hb.Menu.Item
            key={key}
            selected={issue?.priority === key}
            onClick={() => actions.priorityMenu.handleChange(key)}
            style={{ fontSize: 13, paddingBlock: 6.4 }}
          >
            <Hb.Box
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: ISSUE_PRIORITY_REGISTRY[key].color,
                marginRight: 12,
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
        style={{ minWidth: 160, borderRadius: 16 }}
      >
        <Hb.Menu.Item
          role="option"
          aria-selected={!issue?.assignee}
          selected={!issue?.assignee}
          onClick={() => actions.assigneeMenu.handleAssign(undefined)}
          style={{ fontSize: 13, paddingBlock: 6.4 }}
        >
          <Hb.List.ItemIcon style={{
            minWidth: 32
          }}>
            <PersonOffOutlined aria-hidden sx={{ fontSize: 18, color: "text.disabled" }} />
          </Hb.List.ItemIcon>
          <Hb.List.ItemText primary="미할당" primaryStyle={{ fontSize: 13 }} />
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
              style={{ fontSize: 13, paddingBlock: 6.4 }}
            >
              <Hb.List.ItemIcon style={{
                minWidth: 32
              }}>
                <Hb.Avatar
                  alt={member.nickname}
                  style={{
                    width: 22,
                    height: 22,
                    fontSize: 10,
                    fontWeight: 700,
                    backgroundColor: "var(--hb-color-border)",
                    color: "var(--hb-color-text-secondary)",
                  }}
                >
                  {member.nickname.charAt(0).toUpperCase()}
                </Hb.Avatar>
              </Hb.List.ItemIcon>
              <Hb.List.ItemText
                primary={member.nickname}
                primaryStyle={{ fontSize: 13 }}
              />
            </Hb.Menu.Item>
          );
        })}
      </Hb.Menu.Root>
    </>
  );
};
