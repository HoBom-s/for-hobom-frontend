import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MenuBookOutlined,
  CompareArrowsOutlined,
  SchoolOutlined,
  SmartToyOutlined,
  AssignmentOutlined,
} from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

const TABS = [
  { label: "법령", path: "/privacy-law/versions", icon: <MenuBookOutlined /> },
  {
    label: "변경 이력",
    path: "/privacy-law/diffs",
    icon: <CompareArrowsOutlined />,
  },
  { label: "학습 자료", path: "/privacy-law/study", icon: <SchoolOutlined /> },
  {
    label: "모의고사",
    path: "/privacy-law/exams",
    icon: <AssignmentOutlined />,
  },
  { label: "AI 상담", path: "/privacy-law/chat", icon: <SmartToyOutlined /> },
] as const;

const PrivacyLawLayoutPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentTab = TABS.findIndex((tab) => pathname.startsWith(tab.path));

  return (
    <Hb.Box
      style={{
        padding: 24,
      }}
    >
      <Hb.Stack
        direction="row"
        spacing={1.5}
        style={{
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Hb.Text variant="h5" fontWeight={600}>
          개인정보보호법
        </Hb.Text>
        <Hb.Text variant="body2" color="text.secondary">
          CPPG 학습 플랫폼
        </Hb.Text>
      </Hb.Stack>
      <Hb.Tabs.Root
        value={currentTab === -1 ? 0 : currentTab}
        onChange={(_, idx) => navigate(TABS[idx].path)}
        sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
      >
        {TABS.map((tab) => (
          <Hb.Tabs.Item key={tab.path} icon={tab.icon} iconPosition="start" label={tab.label} />
        ))}
      </Hb.Tabs.Root>
      <Outlet />
    </Hb.Box>
  );
};

export default PrivacyLawLayoutPage;
