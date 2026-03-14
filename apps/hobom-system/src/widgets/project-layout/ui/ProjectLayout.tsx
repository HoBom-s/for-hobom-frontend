import {
  ViewKanbanOutlined,
  FormatListBulletedOutlined,
  BugReportOutlined,
  DashboardOutlined,
  SettingsOutlined,
  ChevronRight,
  AddOutlined,
} from "hobom-design-system/icons";
import { Outlet } from "react-router-dom";
import { ProjectContext } from "@/shared/model";
import { CreateIssueDialog } from "@/features/create-issue";
import { CreateSprintDialog } from "@/features/backlog-board";
import { IssueDetailDialog } from "@/features/issue-detail";
import { Hb } from "@/shared/ui";
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
      <Hb.Box sx={{ p: 3 }}>
        {/* Breadcrumb */}
        <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <Hb.Text
            variant="caption"
            sx={{
              color: "text.disabled",
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
            onClick={handleNavigateToProjects}
          >
            프로젝트
          </Hb.Text>
          <ChevronRight sx={{ fontSize: 14, color: "text.disabled" }} />
          <Hb.Text variant="caption" fontWeight={600} color="text.secondary">
            {project.name}
          </Hb.Text>
        </Hb.Box>

        <Hb.Text variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          {project.name}
        </Hb.Text>

        {/* Tab Navigation + Action Buttons */}
        <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
          {TABS.map((tab) => {
            const isActive = currentPath === tab.path;

            return (
              <Hb.ButtonBase
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
              </Hb.ButtonBase>
            );
          })}

          <Hb.Box sx={{ flex: 1 }} />

          {showSprintButton && (
            <Hb.Button
              size="small"
              variant="secondary"
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
            </Hb.Button>
          )}
          {showIssueButton && (
            <Hb.Button
              size="small"
              variant="primary"
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
            </Hb.Button>
          )}
        </Hb.Box>

        <Hb.Divider sx={{ mb: 2.5 }} />

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
      </Hb.Box>
    </ProjectContext.Provider>
  );
};
