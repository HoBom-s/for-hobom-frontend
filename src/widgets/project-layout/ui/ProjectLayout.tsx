import { Box, Button, ButtonBase, Divider, Typography } from "@mui/material";
import {
  ViewKanbanOutlined,
  FormatListBulletedOutlined,
  BugReportOutlined,
  DashboardOutlined,
  SettingsOutlined,
  ChevronRight,
  AddOutlined,
} from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { ProjectContext } from "@/shared/model";
import { CreateIssueDialog } from "@/features/create-issue";
import { CreateSprintDialog } from "@/features/backlog-board";
import { IssueDetailDialog } from "@/features/issue-detail";
import { useProjectLayout, TABS } from "../model/useProjectLayout";
import { useProjectDialogs } from "../model/useProjectDialogs";

const TAB_ICONS: Record<string, React.ReactNode> = {
  board: <ViewKanbanOutlined sx={{ fontSize: 18 }} />,
  backlog: <FormatListBulletedOutlined sx={{ fontSize: 18 }} />,
  issues: <BugReportOutlined sx={{ fontSize: 18 }} />,
  dashboard: <DashboardOutlined sx={{ fontSize: 18 }} />,
  settings: <SettingsOutlined sx={{ fontSize: 18 }} />,
};

export const ProjectLayout = () => {
  const {
    projectId,
    project,
    projectCtx,
    currentPath,
    showIssueButton,
    showSprintButton,
    handleNavigateToProjects,
    handleNavigateToTab,
  } = useProjectLayout();

  const {
    issueDialog,
    sprintDialog,
    detailIssueId,
    setDetailIssueId,
    handleCreateChildIssue,
    handleOpenIssueDetail,
  } = useProjectDialogs();

  if (!projectId) return null;

  return (
    <ProjectContext.Provider value={projectCtx}>
      <Box sx={{ p: 3 }}>
        {/* Breadcrumb */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: "text.disabled",
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
            onClick={handleNavigateToProjects}
          >
            프로젝트
          </Typography>
          <ChevronRight sx={{ fontSize: 14, color: "text.disabled" }} />
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            {project.name}
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          {project.name}
        </Typography>

        {/* Tab Navigation + Action Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
          {TABS.map((tab) => {
            const isActive = currentPath === tab.path;
            return (
              <ButtonBase
                key={tab.path}
                onClick={() => handleNavigateToTab(tab.path)}
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
                {TAB_ICONS[tab.path]}
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
              onClick={() => sprintDialog.setOpen(true)}
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
              onClick={() => issueDialog.setOpen(true)}
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
          open={issueDialog.open}
          onClose={issueDialog.close}
          projectId={projectId}
          defaultParentId={issueDialog.defaultParentId}
        />
        <CreateSprintDialog
          open={sprintDialog.open}
          onClose={sprintDialog.close}
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
    </ProjectContext.Provider>
  );
};
