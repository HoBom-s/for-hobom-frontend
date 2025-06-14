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
import {
  fetchSelectedTodayMenuQueryOption,
  getTodayMenuId,
  useSelectTodayMenu,
} from "@/entities/menu-recommendation";
import { useRouterQuery } from "@/shared/router/model";
import { RoutesConfig } from "@/shared/router/config/routes.config.ts";

export const SelectedMenuContent = () => {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
};

const Inner = () => {
  const navigate = useNavigate();
  const { query } = useRouterQuery();
  const todayMenuId = getTodayMenuId(query);
  const { handler, status } = useSelectTodayMenu();
  const { data } = useQuery({
    ...fetchSelectedTodayMenuQueryOption({ id: todayMenuId }),
    enabled:
      todayMenuId != null && status == "done" && handler.status === "success",
  });

  useEffect(() => {
    handler.mutate({ id: todayMenuId });
  }, [todayMenuId]);

  return (
    <div>
      <SelectedMenuContent.Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          {status === "loading" && handler.isPending && data != null ? (
            <Stack direction="column" alignItems="center">
              <CircularProgress size="48px" sx={{ mb: 3 }} />
              <Typography typography="caption">
                Please wait a moment..
              </Typography>
            </Stack>
          ) : (
            <Stack direction="column" alignItems="center">
              <Typography variant="h6" sx={{ mb: 3 }}>
                Today's Menu
              </Typography>
              <Typography variant="subtitle2">
                {data?.items.recommendedMenu.name}
              </Typography>
              <Typography variant="caption">
                {data?.items.recommendedMenu.registerPerson.username}'s Food.
              </Typography>
            </Stack>
          )}
        </Box>
      </SelectedMenuContent.Layout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        mt={2}
        px={2}
        width="100%"
      >
        <Button
          fullWidth
          color="info"
          variant="contained"
          onClick={() =>
            navigate(RoutesConfig.MENU.RECOMMENDATION, { replace: true })
          }
        >
          Confirm
        </Button>
      </Box>
    </div>
  );
};

SelectedMenuContent.Layout = ({ children }: { children: ReactNode }) => (
  <Paper
    elevation={2}
    sx={{
      width: "92%",
      height: "calc(100vh - 80px)",
      m: "0 auto",
      mt: "6px",
      px: 3,
      py: 1,
      bgcolor: "background.paper",
      overflowY: "auto",
    }}
  >
    {children}
  </Paper>
);
