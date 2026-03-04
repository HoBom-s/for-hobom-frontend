import { type ReactNode, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { menuQueries, useTodayMenuId } from "@/entities/menu-recommendation";
import { useSelectTodayMenu } from "../model/useSelectTodayMenu";
import { RoutesConfig } from "@/shared/config";

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
    enabled:
      todayMenuId != null && status === "done" && handler.status === "success",
  });

  useEffect(() => {
    if (todayMenuId == null) {
      return;
    }
    handler.mutate({ id: todayMenuId });
  }, [todayMenuId]);

  const showProgressCircle =
    todayMenuId == null ||
    status === "loading" ||
    handler.isPending ||
    data == null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <SelectedMenuContent.Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          {showProgressCircle ? (
            <Stack direction="column" alignItems="center" spacing={1.5}>
              <CircularProgress size="48px" />
              <Typography variant="body2" color="text.secondary">
                메뉴를 추첨할 동안 잠시만 기다려 주세요.
              </Typography>
            </Stack>
          ) : (
            <Stack direction="column" alignItems="center" spacing={1}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 0.5 }}
              >
                오늘의 메뉴는
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {data?.items.recommendedMenu.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data?.items.recommendedMenu.registerPerson.username} 님이
                등록한 메뉴
              </Typography>
            </Stack>
          )}
        </Box>
      </SelectedMenuContent.Layout>
      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={showProgressCircle}
          sx={{ borderRadius: 2, py: 1.2, fontWeight: 600 }}
          onClick={() =>
            navigate(RoutesConfig.MENU.RECOMMENDATION, { replace: true })
          }
        >
          확인
        </Button>
      </Box>
    </Box>
  );
};

SelectedMenuContent.Layout = ({ children }: { children: ReactNode }) => (
  <Paper
    elevation={0}
    sx={{
      flexGrow: 1,
      overflowY: "auto",
      px: 3,
      py: 1,
    }}
  >
    {children}
  </Paper>
);
