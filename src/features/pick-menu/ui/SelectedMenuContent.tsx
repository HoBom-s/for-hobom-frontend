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
      todayMenuId != null && status == "done" && handler.status === "success",
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
        gap: 2,
        p: 3,
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
            <Stack direction="column" alignItems="center">
              <CircularProgress size="48px" sx={{ mb: 3 }} />
              <Typography typography="caption">
                메뉴를 추첨할 동안 잠시만 기다려 주세요.
              </Typography>
            </Stack>
          ) : (
            <Stack direction="column" alignItems="center">
              <Typography variant="h6" sx={{ mb: 3 }}>
                오늘의 메뉴
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                {data?.items.recommendedMenu.name}
              </Typography>
              <Typography variant="caption">
                {data?.items.recommendedMenu.registerPerson.username}'s Food.
              </Typography>
            </Stack>
          )}
        </Box>
      </SelectedMenuContent.Layout>
      <Box display="flex" width="100%">
        <Button
          fullWidth
          variant="contained"
          disabled={showProgressCircle}
          onClick={() =>
            navigate(RoutesConfig.MENU.RECOMMENDATION, { replace: true })
          }
        >
          추첨하기
        </Button>
      </Box>
    </Box>
  );
};

SelectedMenuContent.Layout = ({ children }: { children: ReactNode }) => (
  <Paper
    elevation={2}
    sx={{
      flexGrow: 1,
      overflowY: "auto",
      px: 3,
      py: 1,
      bgcolor: "background.paper",
    }}
  >
    {children}
  </Paper>
);
