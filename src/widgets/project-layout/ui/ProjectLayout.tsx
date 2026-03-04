import { useState } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { Box, Button, ButtonBase, Divider, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ViewKanbanOutlined,
  FormatListBulletedOutlined,
  BugReportOutlined,
  SettingsOutlined,
  ChevronRight,
  AddOutlined,
} from "@mui/icons-material";
import { projectQueries } from "@/entities/project";
import { CreateIssueDialog } from "@/features/create-issue";
import { CreateSprintDialog } from "@/features/backlog-board";
import { IssueDetailDialog } from "@/features/issue-detail";

const TABS = [
  {
    label: "보드",
    path: "board",
    icon: <ViewKanbanOutlined sx={{ fontSize: 18 }} />,
  },
  {
    label: "백로그",
    path: "backlog",
    icon: <FormatListBulletedOutlined sx={{ fontSize: 18 }} />,
  },
  {
    label: "이슈",
    path: "issues",
    icon: <BugReportOutlined sx={{ fontSize: 18 }} />,
  },
  {
    label: "설정",
    path: "settings",
    icon: <SettingsOutlined sx={{ fontSize: 18 }} />,
  },
] as const;

const TABS_WITH_ISSUE_BUTTON = new Set(["board", "backlog", "issues"]);

export const ProjectLayout = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [sprintDialogOpen, setSprintDialogOpen] = useState(false);
  const [defaultParentId, setDefaultParentId] = useState<string>();
  const [detailIssueId, setDetailIssueId] = useState<string | null>(null);

  const handleCreateChildIssue = (parentId: string) => {
    setDefaultParentId(parentId);
    setIssueDialogOpen(true);
  };

  const handleOpenIssueDetail = (issueId: string) => {
    setDetailIssueId(issueId);
  };

  const { data } = useSuspenseQuery(projectQueries.detail(projectId!));
  const project = data.items;

  if (!projectId) return null;

  const currentPath = TABS.find((t) =>
    location.pathname.includes(`/${t.path}`),
  )?.path;

  const showIssueButton = TABS_WITH_ISSUE_BUTTON.has(currentPath ?? "");
  const showSprintButton = currentPath === "backlog";

  return (
    <Box sx={{ p: 3 }}>
      {/* Breadcrumb */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            cursor: "pointer",
            "&:hover": { color: "primary.main" },
          }}
          onClick={() => navigate("/projects")}
        >
          프로젝트
        </Typography>
        <ChevronRight sx={{ fontSize: 14, color: "text.disabled" }} />
        <Typography variant="caption" fontWeight={600} color="text.secondary">
          {project.name}
        </Typography>
      </Box>

      {/* Title */}
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {project.name}
      </Typography>

      {/* Tab Navigation + Action Buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 0.5,
        }}
      >
        {TABS.map((tab) => {
          const isActive = currentPath === tab.path;
          return (
            <ButtonBase
              key={tab.path}
              onClick={() => navigate(`/projects/${projectId}/${tab.path}`)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.5,
                py: 1,
                borderRadius: 1.5,
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "#fff" : "text.secondary",
                bgcolor: isActive ? "primary.main" : "transparent",
                "&:hover": isActive ? undefined : { bgcolor: "action.hover" },
                transition: "all 0.15s",
              }}
            >
              {tab.icon}
              {tab.label}
            </ButtonBase>
          );
        })}

        <Box sx={{ flex: 1 }} />

        {showSprintButton && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddOutlined />}
            onClick={() => setSprintDialogOpen(true)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 12,
              boxShadow: "none",
            }}
          >
            스프린트 만들기
          </Button>
        )}
        {showIssueButton && (
          <Button
            size="small"
            variant="contained"
            startIcon={<AddOutlined />}
            onClick={() => setIssueDialogOpen(true)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 12,
              boxShadow: "none",
              "&:hover": { boxShadow: "0 2px 8px rgba(70,128,255,0.3)" },
            }}
          >
            이슈 만들기
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      <Outlet
        context={{
          onCreateChildIssue: handleCreateChildIssue,
          onOpenIssueDetail: handleOpenIssueDetail,
        }}
      />

      <CreateIssueDialog
        open={issueDialogOpen}
        onClose={() => {
          setIssueDialogOpen(false);
          setDefaultParentId(undefined);
        }}
        projectId={projectId}
        defaultParentId={defaultParentId}
      />
      <CreateSprintDialog
        open={sprintDialogOpen}
        onClose={() => setSprintDialogOpen(false)}
        projectId={projectId}
      />
      <IssueDetailDialog
        open={!!detailIssueId}
        onClose={() => setDetailIssueId(null)}
        projectId={projectId}
        issueId={detailIssueId}
        onNavigateToIssue={setDetailIssueId}
      />
    </Box>
  );
};
