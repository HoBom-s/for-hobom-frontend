import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Tab, Tabs, Typography, Stack } from "@mui/material";
import {
  MenuBookOutlined,
  CompareArrowsOutlined,
  SchoolOutlined,
  SmartToyOutlined,
} from "@mui/icons-material";

const TABS = [
  { label: "법령", path: "/privacy-law/versions", icon: <MenuBookOutlined /> },
  {
    label: "변경 이력",
    path: "/privacy-law/diffs",
    icon: <CompareArrowsOutlined />,
  },
  { label: "학습 자료", path: "/privacy-law/study", icon: <SchoolOutlined /> },
  { label: "AI 상담", path: "/privacy-law/chat", icon: <SmartToyOutlined /> },
] as const;

const PrivacyLawLayoutPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentTab = TABS.findIndex((tab) => pathname.startsWith(tab.path));

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          개인정보보호법
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CPPG 학습 플랫폼
        </Typography>
      </Stack>

      <Tabs
        value={currentTab === -1 ? 0 : currentTab}
        onChange={(_, idx) => navigate(TABS[idx].path)}
        sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.path}
            icon={tab.icon}
            iconPosition="start"
            label={tab.label}
          />
        ))}
      </Tabs>

      <Outlet />
    </Box>
  );
};

export default PrivacyLawLayoutPage;
