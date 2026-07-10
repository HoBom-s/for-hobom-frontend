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
import * as stylex from "@stylexjs/stylex";
import { ProjectContext } from "@/entities/project";
import { CreateIssueDialog } from "@/features/create-issue";
import { CreateSprintDialog } from "@/features/backlog-board";
import { IssueDetailDialog } from "@/features/issue-detail";
import { Hb } from "@/shared/ui";
import { useProjectLayout, TABS } from "../model/useProjectLayout";
import { useProjectDialogs } from "../model/useProjectDialogs";

const styles = stylex.create({
  crumb: {
    color: "var(--hb-color-text-disabled)",
    cursor: "pointer",
    ":hover": { color: "var(--hb-color-accent)" },
  },
  createIssueButton: {
    textTransform: "none",
    borderRadius: 16,
    fontWeight: 600,
    fontSize: 12,
    boxShadow: "none",
    ":hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.18)" },
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    paddingInline: 12,
    paddingBlock: 8,
    borderRadius: 12,
    fontSize: 13,
    transition: "all 0.15s",
  },
  tabActive: {
    backgroundColor: "var(--hb-color-accent)",
  },
  tabInactive: {
    backgroundColor: { default: "transparent", ":hover": "rgba(0,0,0,0.04)" },
  },
});

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
      <Hb.Box
        style={{
          padding: 24,
        }}
      >
        {/* Breadcrumb */}
        <Hb.Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 8,
          }}
        >
          <Hb.Text
            variant="caption"
            {...stylex.props(styles.crumb)}
            onClick={handleNavigateToProjects}
          >
            프로젝트
          </Hb.Text>
          <ChevronRight sx={{ fontSize: 14, color: "text.disabled" }} />
          <Hb.Text variant="caption" fontWeight={600} color="text.secondary">
            {project.name}
          </Hb.Text>
        </Hb.Box>

        <Hb.Text
          variant="h5"
          fontWeight={700}
          style={{
            marginBottom: 16,
          }}
        >
          {project.name}
        </Hb.Text>

        {/* Tab Navigation + Action Buttons */}
        <Hb.Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 4,
          }}
        >
          {TABS.map((tab) => {
            const isActive = currentPath === tab.path;

            return (
              <Hb.ButtonBase
                key={tab.path}
                onClick={() => handleNavigateToTab(tab.path)}
                {...stylex.props(styles.tab, isActive ? styles.tabActive : styles.tabInactive)}
                style={{
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#fff" : "var(--hb-color-text-secondary)",
                }}
              >
                {TAB_ICONS[tab.path]}
                {tab.label}
              </Hb.ButtonBase>
            );
          })}

          <Hb.Box
            style={{
              flex: 1,
            }}
          />

          {showSprintButton && (
            <Hb.Button
              size="small"
              variant="secondary"
              startIcon={<AddOutlined />}
              onClick={() => sprintDialog.setOpen(true)}
              style={{
                textTransform: "none",
                borderRadius: 16,
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
              {...stylex.props(styles.createIssueButton)}
            >
              이슈 만들기
            </Hb.Button>
          )}
        </Hb.Box>

        <Hb.Divider
          style={{
            marginBottom: 20,
          }}
        />

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
