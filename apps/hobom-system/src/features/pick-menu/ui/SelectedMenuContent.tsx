import { type ReactNode, Suspense, useEffect } from "react";
import { useNavigate } from "react-router";
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
  const { mutate: selectTodayMenu } = handler;
  const { data } = useQuery({
    ...menuQueries.selectedTodayMenu({ id: String(todayMenuId) }),
    enabled: todayMenuId != null && status === "done" && handler.status === "success",
  });

  useEffect(() => {
    if (todayMenuId == null) {
      return;
    }
    selectTodayMenu({ id: todayMenuId });
  }, [todayMenuId, selectTodayMenu]);

  const showProgressCircle =
    todayMenuId == null || status === "loading" || handler.isPending || data == null;

  return (
    <Hb.Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <SelectedMenuContent.Layout>
        <Hb.Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {showProgressCircle ? (
            <Hb.Stack
              direction="column"
              spacing={1.5}
              style={{
                alignItems: "center",
              }}
            >
              <Hb.Progress.Circular size="48px" />
              <Hb.Text variant="body2" color="text.secondary">
                메뉴를 추첨할 동안 잠시만 기다려 주세요.
              </Hb.Text>
            </Hb.Stack>
          ) : (
            <Hb.Stack
              direction="column"
              spacing={1}
              style={{
                alignItems: "center",
              }}
            >
              <Hb.Text
                variant="body2"
                style={{
                  color: "var(--hb-color-text-secondary)",
                  marginBottom: 4,
                }}
              >
                오늘의 메뉴는
              </Hb.Text>
              <Hb.Text
                variant="h5"
                style={{
                  fontWeight: 700,
                }}
              >
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
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
          borderTop: "1px solid",
          borderColor: "var(--hb-color-border)",
          flexShrink: 0,
        }}
      >
        <Hb.Button
          fullWidth
          variant="primary"
          disableElevation
          disabled={showProgressCircle}
          style={{
            borderRadius: 16,
            paddingTop: 9.6,
            paddingBottom: 9.6,
            fontWeight: 600,
          }}
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
    style={{
      flexGrow: 1,
      overflowY: "auto",
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 8,
      paddingBottom: 8,
    }}
  >
    {children}
  </Hb.Paper>
);
