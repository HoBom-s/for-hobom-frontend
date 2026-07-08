import { useState } from "react";
import {
  InboxOutlined,
  MoreVertOutlined,
  DriveFileMoveOutlined,
  AddOutlined,
  SubdirectoryArrowRightOutlined,
  ChevronRightOutlined,
  ExpandMoreOutlined,
} from "hobom-design-system/icons";
import * as stylex from "@stylexjs/stylex";
import { useUpdateIssue, PARENT_ISSUE_KINDS, type IssueType } from "@/entities/issue";
import { ISSUE_KIND_REGISTRY, ISSUE_PRIORITY_REGISTRY } from "@/entities/issue/ui";
import { Hb } from "@/shared/ui";
import { useBacklogContext } from "../model/useBacklogContext";

const styles = stylex.create({
  moveButton: {
    opacity: 0,
    padding: 2.4,
    color: "var(--hb-color-text-disabled)",
    ":hover": { color: "var(--hb-color-accent)" },
  },
});

// StyleX is atomic and cannot express the hover-reveal descendant selectors, so
// the row styling is rendered as a scoped <style> tag instead.
const ROW_CLASS = "backlog-issue-row";
const ROW_CSS = `
.${ROW_CLASS} {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 16px;
  padding-top: 6.4px;
  padding-bottom: 6.4px;
  border-bottom: 1px solid var(--hb-color-border);
  transition: background 0.1s;
}
.${ROW_CLASS}:hover { background-color: var(--hb-color-border); }
.${ROW_CLASS}:hover .move-btn { opacity: 1; }
.${ROW_CLASS}:focus-within .move-btn { opacity: 1; }
`;

interface IssueRowProps {
  issue: IssueType;
  depth?: number;
  childCount?: number;
  isCollapsed?: boolean;
  onToggleCollapse?: (issueId: string) => void;
  progress?: { completed: number; total: number };
}

export const IssueRow = ({
  issue,
  depth = 0,
  childCount = 0,
  isCollapsed,
  onToggleCollapse,
  progress,
}: IssueRowProps) => {
  const { sprints, projectId, onCreateChildIssue, onIssueClick } = useBacklogContext();
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);
  const { mutate: updateIssue } = useUpdateIssue();
  const kind = ISSUE_KIND_REGISTRY[issue.type];
  const priority = ISSUE_PRIORITY_REGISTRY[issue.priority];

  const handleMove = (sprintId: string | undefined) => {
    updateIssue({
      projectId,
      issueId: issue.id,
      sprint: sprintId,
    });
    setMenuEl(null);
  };

  const moveTargets = [
    ...sprints
      .filter((s) => s.status !== "COMPLETED" && s.id !== issue.sprint)
      .map((s) => ({ id: s.id, label: s.name })),
    ...(issue.sprint ? [{ id: undefined as string | undefined, label: "백로그" }] : []),
  ];

  const canAddChild = PARENT_ISSUE_KINDS.has(issue.type) && onCreateChildIssue;
  const showMenu = moveTargets.length > 0 || canAddChild;

  // Combine the StyleX class with the parent-scoped "move-btn" hover-reveal class.
  const moveButtonProps = stylex.props(styles.moveButton);

  const renderLeadingCell = () => {
    if (childCount > 0 && onToggleCollapse) {
      return (
        <Hb.Button.Icon
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse(issue.id);
          }}
          style={{
            padding: 0,
            marginLeft: -4,
            color: "var(--hb-color-text-disabled)",
          }}
        >
          {isCollapsed ? (
            <ChevronRightOutlined sx={{ fontSize: 16 }} />
          ) : (
            <ExpandMoreOutlined sx={{ fontSize: 16 }} />
          )}
        </Hb.Button.Icon>
      );
    }
    if (depth > 0) {
      return (
        <SubdirectoryArrowRightOutlined sx={{ fontSize: 14, color: "text.disabled", ml: -1.5 }} />
      );
    }

    return null;
  };

  return (
    <>
      {/* React 19 hoists and de-dupes by `href`, so the rule is emitted once
          even though every row renders this. */}
      <style href={ROW_CLASS} precedence="default">
        {ROW_CSS}
      </style>
      <Hb.Box
        className={ROW_CLASS}
        style={{
          paddingLeft: (2 + depth * 3) * 8,
          cursor: onIssueClick ? "pointer" : undefined,
        }}
        onClick={() => onIssueClick?.(issue.id)}
      >
        {renderLeadingCell()}
        <kind.Icon sx={{ fontSize: 16, color: kind.color }} />
        <Hb.Text
          variant="caption"
          style={{
            color: "var(--hb-color-text-disabled)",
            fontWeight: 600,
            minWidth: 72,
            fontSize: 12,
          }}
        >
          {issue.issueKey}
        </Hb.Text>
        <Hb.Text
          variant="body2"
          style={{
            flex: 1,
            fontSize: 13,
          }}
          noWrap
        >
          {issue.title}
        </Hb.Text>
        {childCount > 0 && (
          <Hb.Chip
            label={`${childCount} 하위`}
            size="small"
            style={{
              height: 18,
              fontSize: 10,
              fontWeight: 600,
              backgroundColor: "var(--hb-color-border)",
              color: "var(--hb-color-text-secondary)",
            }}
          />
        )}
        {progress && progress.total > 0 && (
          <Hb.Chip
            label={`${progress.completed}/${progress.total} 완료`}
            size="small"
            style={{
              height: 18,
              fontSize: 10,
              fontWeight: 600,
              backgroundColor: progress.completed === progress.total ? "#e8f5e9" : "#fff3e0",
              color: progress.completed === progress.total ? "#2ca87f" : "#e58a00",
            }}
          />
        )}
        <priority.Icon sx={{ fontSize: 16, color: priority.color }} />
        {issue.assignee && (
          <Hb.Avatar
            style={{
              width: 22,
              height: 22,
              fontSize: 10,
              fontWeight: 700,
              backgroundColor: "var(--hb-color-border)",
              color: "var(--hb-color-text-secondary)",
            }}
          >
            {issue.assignee.charAt(0).toUpperCase()}
          </Hb.Avatar>
        )}
        {showMenu && (
          <Hb.Button.Icon
            {...moveButtonProps}
            className={`move-btn ${moveButtonProps.className ?? ""}`}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setMenuEl(e.currentTarget);
            }}
          >
            <MoreVertOutlined sx={{ fontSize: 16 }} />
          </Hb.Button.Icon>
        )}
      </Hb.Box>
      <Hb.Menu.Root
        anchorEl={menuEl}
        open={Boolean(menuEl)}
        onClose={() => setMenuEl(null)}
        style={{ minWidth: 180, borderRadius: 16 }}
      >
        {canAddChild && (
          <Hb.Menu.Item
            onClick={() => {
              onCreateChildIssue(issue.id);
              setMenuEl(null);
            }}
            style={{ fontSize: 13, paddingBlock: 6.4 }}
          >
            <Hb.List.ItemIcon sx={{ minWidth: 28 }}>
              <AddOutlined sx={{ fontSize: 16 }} />
            </Hb.List.ItemIcon>
            <Hb.List.ItemText
              primary="하위 이슈 추가"
              slotProps={{ primary: { sx: { fontSize: 13 } } }}
            />
          </Hb.Menu.Item>
        )}
        {canAddChild && moveTargets.length > 0 && <Hb.Divider />}
        {moveTargets.length > 0 && (
          <Hb.Menu.Item disabled style={{ fontSize: 11, paddingBlock: 4, minHeight: 0 }}>
            이동
          </Hb.Menu.Item>
        )}
        {moveTargets.map((t) => (
          <Hb.Menu.Item
            key={t.id ?? "backlog"}
            onClick={() => handleMove(t.id)}
            style={{ fontSize: 13, paddingBlock: 6.4 }}
          >
            <Hb.List.ItemIcon sx={{ minWidth: 28 }}>
              {t.id ? (
                <DriveFileMoveOutlined sx={{ fontSize: 16 }} />
              ) : (
                <InboxOutlined sx={{ fontSize: 16 }} />
              )}
            </Hb.List.ItemIcon>
            <Hb.List.ItemText primary={t.label} slotProps={{ primary: { sx: { fontSize: 13 } } }} />
          </Hb.Menu.Item>
        ))}
      </Hb.Menu.Root>
    </>
  );
};
