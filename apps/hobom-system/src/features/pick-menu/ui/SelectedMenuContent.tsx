import { type ReactNode, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "hobom-data";
import { menuQueries, useTodayMenuId } from "@/entities/menu-recommendation";
import { RoutesConfig } from "@/shared/config";
import { Hb } from "@/shared/ui";
import { useSelectTodayMenu } from "../model/useSelectTodayMenu";

export const SelectedMenuContent = () => {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
};

const Inner = () => {
  const navigate = useNavigate();
  const { todayMenuId } = useTodayMenuId();
  const { handler, status } = useSelectTodayMenu();
  const { data } = useQuery({
    ...menuQueries.selectedTodayMenu({ id: String(todayMenuId) }),
    enabled: todayMenuId != null && status === "done" && handler.status === "success",
  });

  useEffect(() => {
    if (todayMenuId == null) {
      return;
    }
    handler.mutate({ id: todayMenuId });
  }, [todayMenuId]);

  const showProgressCircle =
    todayMenuId == null || status === "loading" || handler.isPending || data == null;

  return (
    <Hb.Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <SelectedMenuContent.Layout>
        <Hb.Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          {showProgressCircle ? (
            <Hb.Stack direction="column" alignItems="center" spacing={1.5}>
              <Hb.Progress.Circular size="48px" />
              <Hb.Text variant="body2" color="text.secondary">
                메뉴를 추첨할 동안 잠시만 기다려 주세요.
              </Hb.Text>
            </Hb.Stack>
          ) : (
            <Hb.Stack direction="column" alignItems="center" spacing={1}>
              <Hb.Text variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                오늘의 메뉴는
              </Hb.Text>
              <Hb.Text variant="h5" sx={{ fontWeight: 700 }}>
                {data?.items.recommendedMenu.name}
              </Hb.Text>
              <Hb.Text variant="body2" color="text.secondary">
                {data?.items.recommendedMenu.registerPerson.username} 님이 등록한 메뉴
              </Hb.Text>
            </Hb.Stack>
          )}
        </Hb.Box>
      </SelectedMenuContent.Layout>
      <Hb.Box
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Hb.Button
          fullWidth
          variant="primary"
          disableElevation
          disabled={showProgressCircle}
          sx={{ borderRadius: 2, py: 1.2, fontWeight: 600 }}
          onClick={() => navigate(RoutesConfig.MENU.RECOMMENDATION, { replace: true })}
        >
          확인
        </Hb.Button>
      </Hb.Box>
    </Hb.Box>
  );
};

SelectedMenuContent.Layout = ({ children }: { children: ReactNode }) => (
  <Hb.Paper
    elevation={0}
    sx={{
      flexGrow: 1,
      overflowY: "auto",
      px: 3,
      py: 1,
    }}
  >
    {children}
  </Hb.Paper>
);
