import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { Box, ButtonBase, Divider, Typography } from "@mui/material";
import {
  ViewKanbanOutlined,
  FormatListBulletedOutlined,
  BugReportOutlined,
  SettingsOutlined,
  ChevronRight,
} from "@mui/icons-material";

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

const MOCK_PROJECT_NAME: Record<string, string> = {
  "proj-1": "HoBom 백오피스",
  "proj-2": "HoBom 모바일",
  "proj-3": "인프라 관리",
};

export const ProjectLayout = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  if (!projectId) return null;

  const currentPath = TABS.find((t) =>
    location.pathname.includes(`/${t.path}`),
  )?.path;
  const projectName = MOCK_PROJECT_NAME[projectId] ?? "프로젝트";

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
          {projectName}
        </Typography>
      </Box>

      {/* Title */}
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {projectName}
      </Typography>

      {/* Tab Navigation */}
      <Box
        sx={{
          display: "flex",
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
                color: isActive ? "primary.main" : "text.secondary",
                bgcolor: isActive ? "primary.main" : "transparent",
                ...(isActive && {
                  color: "#fff",
                  bgcolor: "primary.main",
                }),
                "&:hover": isActive ? undefined : { bgcolor: "action.hover" },
                transition: "all 0.15s",
              }}
            >
              {tab.icon}
              {tab.label}
            </ButtonBase>
          );
        })}
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      <Outlet />
    </Box>
  );
};
