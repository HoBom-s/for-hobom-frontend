import { useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  InboxOutlined,
  MoreVertOutlined,
  DriveFileMoveOutlined,
  AddOutlined,
  SubdirectoryArrowRightOutlined,
  ChevronRightOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";
import {
  useUpdateIssue,
  PARENT_ISSUE_KINDS,
  ISSUE_KIND_REGISTRY,
  ISSUE_PRIORITY_REGISTRY,
  type IssueType,
} from "@/entities/issue";
import { useBacklogContext } from "../model/useBacklogContext";

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
  const { sprints, projectId, onCreateChildIssue, onIssueClick } =
    useBacklogContext();
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
    ...(issue.sprint
      ? [{ id: undefined as string | undefined, label: "백로그" }]
      : []),
  ];

  const canAddChild = PARENT_ISSUE_KINDS.has(issue.type) && onCreateChildIssue;
  const showMenu = moveTargets.length > 0 || canAddChild;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          pl: 2 + depth * 3,
          pr: 2,
          py: 0.8,
          borderBottom: "1px solid",
          borderColor: "divider",
          "&:hover": { bgcolor: "action.hover" },
          "&:hover .move-btn, &:focus-within .move-btn": { opacity: 1 },
          transition: "background 0.1s",
          cursor: onIssueClick ? "pointer" : undefined,
        }}
        onClick={() => onIssueClick?.(issue.id)}
      >
        {childCount > 0 && onToggleCollapse ? (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollapse(issue.id);
            }}
            sx={{ p: 0, ml: -0.5, color: "text.disabled" }}
          >
            {isCollapsed ? (
              <ChevronRightOutlined sx={{ fontSize: 16 }} />
            ) : (
              <ExpandMoreOutlined sx={{ fontSize: 16 }} />
            )}
          </IconButton>
        ) : depth > 0 ? (
          <SubdirectoryArrowRightOutlined
            sx={{ fontSize: 14, color: "text.disabled", ml: -1.5 }}
          />
        ) : null}
        <kind.Icon sx={{ fontSize: 16, color: kind.color }} />
        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            fontWeight: 600,
            minWidth: 72,
            fontSize: 12,
          }}
        >
          {issue.issueKey}
        </Typography>
        <Typography variant="body2" sx={{ flex: 1, fontSize: 13 }} noWrap>
          {issue.title}
        </Typography>
        {childCount > 0 && (
          <Chip
            label={`${childCount} 하위`}
            size="small"
            sx={{
              height: 18,
              fontSize: 10,
              fontWeight: 600,
              bgcolor: "action.selected",
              color: "text.secondary",
            }}
          />
        )}
        {progress && progress.total > 0 && (
          <Chip
            label={`${progress.completed}/${progress.total} 완료`}
            size="small"
            sx={{
              height: 18,
              fontSize: 10,
              fontWeight: 600,
              bgcolor:
                progress.completed === progress.total ? "#e8f5e9" : "#fff3e0",
              color:
                progress.completed === progress.total ? "#2ca87f" : "#e58a00",
            }}
          />
        )}
        <priority.Icon sx={{ fontSize: 16, color: priority.color }} />
        {issue.assignee && (
          <Avatar
            sx={{
              width: 22,
              height: 22,
              fontSize: 10,
              fontWeight: 700,
              bgcolor: "action.selected",
              color: "text.secondary",
            }}
          >
            {issue.assignee.charAt(0).toUpperCase()}
          </Avatar>
        )}
        {showMenu && (
          <IconButton
            className="move-btn"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setMenuEl(e.currentTarget);
            }}
            sx={{
              opacity: 0,
              p: 0.3,
              color: "text.disabled",
              "&:hover": { color: "primary.main" },
            }}
          >
            <MoreVertOutlined sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>

      <Menu
        anchorEl={menuEl}
        open={Boolean(menuEl)}
        onClose={() => setMenuEl(null)}
        slotProps={{
          paper: { sx: { minWidth: 180, borderRadius: 2, boxShadow: 3 } },
        }}
      >
        {canAddChild && (
          <MenuItem
            onClick={() => {
              onCreateChildIssue(issue.id);
              setMenuEl(null);
            }}
            sx={{ fontSize: 13, py: 0.8 }}
          >
            <ListItemIcon sx={{ minWidth: 28 }}>
              <AddOutlined sx={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText
              primary="하위 이슈 추가"
              slotProps={{ primary: { sx: { fontSize: 13 } } }}
            />
          </MenuItem>
        )}
        {canAddChild && moveTargets.length > 0 && <Divider />}
        {moveTargets.length > 0 && (
          <MenuItem disabled sx={{ fontSize: 11, py: 0.5, minHeight: 0 }}>
            이동
          </MenuItem>
        )}
        {moveTargets.map((t) => (
          <MenuItem
            key={t.id ?? "backlog"}
            onClick={() => handleMove(t.id)}
            sx={{ fontSize: 13, py: 0.8 }}
          >
            <ListItemIcon sx={{ minWidth: 28 }}>
              {t.id ? (
                <DriveFileMoveOutlined sx={{ fontSize: 16 }} />
              ) : (
                <InboxOutlined sx={{ fontSize: 16 }} />
              )}
            </ListItemIcon>
            <ListItemText
              primary={t.label}
              slotProps={{ primary: { sx: { fontSize: 13 } } }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
